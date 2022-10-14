import { ConfigService } from '../config/config.service';
import fs = require('fs');

const configService = new ConfigService(process.env.NODE_ENV || 'production');

fs.writeFileSync(
  __dirname + '/../../ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
); 