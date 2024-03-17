self.addEventListener('message', (event) => {
  const data = event.data;
  switch (data.type) {
    case 'setup':
      // 녹화 초기 설정 로직
      break;
    case 'recordFrame':
      // 프레임 녹화 로직
      break;
    case 'stop':
      // 녹화 중단 및 처리 로직
      break;
    default:
      throw new Error('Unknown command');
  }
});
