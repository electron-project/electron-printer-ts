const { platform } = process;

const CurrentPlatform = {
  isMac: platform === 'darwin',
  isWindows: platform === 'win32',
  isLinux: platform === 'linux',
};

export default CurrentPlatform;
