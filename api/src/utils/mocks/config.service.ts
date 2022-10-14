import { ConfigService } from '../../config/config.service';
const configService = new ConfigService('test');


export const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION_TIME':
        return '3600';
    }
  },
  getSendgridConfig(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION_TIME':
        return '3600';
    }
  },
  getYoutubeConfig(key: string) {
    return {
      key: configService.getYoutubeConfig().key
    }
  },
};
