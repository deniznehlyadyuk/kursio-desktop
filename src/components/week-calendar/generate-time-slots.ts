import dayjs from 'dayjs';

export default () => {
  const result = [];
  let currentTime = dayjs().startOf('day').add(8, 'hour');

  for (let i = 0; i < 13; i++) {
    result.push(currentTime.clone());
    currentTime = currentTime.add(1, 'hour');
  }

  return result;
}
