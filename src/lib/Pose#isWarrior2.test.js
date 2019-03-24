import sample from '../../spec/posenet_sample/warrior2_pose_testing';
import Pose from './posenetWrapper';


it('#isWarrior2 can recognise correct position', () => {
  var input = sample['correct'][0]
  var subject = new Pose(input)
  expect(subject.isWarrior2()).toEqual(false)
});
