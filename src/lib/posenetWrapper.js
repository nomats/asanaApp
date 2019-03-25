import Bodypart from './bodypart';
import MathModels from './mathModels'

class Pose{
  constructor(posenetObject) {
    this.source = posenetObject;
    this._mm = new MathModels();
    this._bodypartIndexLookup = {
      "nose" : 0, "leftEye" : 1, "rightEye" : 2,
      "leftEar" : 3, "rightEar" : 4, "leftShoulder" : 5,
      "rightShoulder" : 6, "leftElbow" : 7, "rightElbow" : 8,
      "leftWrist" : 9, "rightWrist" : 10, "leftHip" : 11,
      "rightHip" : 12, "leftKnee" : 13, "rightKnee" : 14,
      "leftAnkle" : 15, "rightAnkle" : 16
    };
  }

  bodypart(bodypart){
    return (new Bodypart(this.source['keypoints'][this._bodypartIndexLookup[bodypart]]))
  }

  isMountainPose(){
    // var conditional =  new conditional([
    //this._isPointBetween(blah),
    //this._isHigherThan(blah),
    //this._isLowerThan(blah),
    //])
    // return conditional.isMet
    const c1 = this.bodypart("rightWrist").position['y'] > this.bodypart("rightHip").position['y']
    const c2 = this.bodypart("leftWrist").position['y'] > this.bodypart("leftHip").position['y']
    // lower body x-coordinates
    const c3 = this._isPointBetween(this.bodypart("leftAnkle").position['x'],[this.bodypart("leftShoulder").position['x'],this.bodypart("rightShoulder").position['x']])
    const c4 = this._isPointBetween(this.bodypart("rightAnkle").position['x'],[this.bodypart("leftShoulder").position['x'],this.bodypart("rightShoulder").position['x']])
    const c5 = this.bodypart("leftAnkle").position['x'] > this.bodypart("rightAnkle").position['x']
    const c6 = this._isStraight([this.bodypart("leftAnkle").position,
                                this.bodypart("leftKnee").position,
                                this.bodypart("leftHip").position])
    return (c1 && c2 && c3 && c4 && c5 )
  }

isGoddess(){
  const criteria1 = "left knee makes 90 degree";
  const leftKneeAngle = this._angle(this.bodypart("leftHip").position,
                                    this.bodypart("leftKnee").position,
                                    this.bodypart("leftAnkle").position
                                  );
  console.log(leftKneeAngle);
  const check1 = leftKneeAngle < 150;

  return (check1)
};

  _isPointBetween(point,boundary){
    boundary.sort(function(a,b){return a - b});
    const withinUpperBound = boundary[1] > point
    const withinLowerBound = boundary[0] < point
    return withinUpperBound && withinLowerBound
  }

  _isStraight(points){
    return this._mm.isStraight(points)
  }

  _angle(edge1,middle,edge2){
    return this._mm.angle(edge1,middle,edge2)
  }

  _isHorizontal(points){
    return this._mm.isHorizontal(points)
  }
};

export default Pose;
