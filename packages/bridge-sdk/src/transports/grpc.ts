import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';

export default (host: string = 'plugindata.converse.ai:443') => {
  const packageDef = loadSync(
    'github.com/converseai/service/plugindata/datamanagement.proto',
    { includeDirs: [join(__dirname, '../../protos')] }
  );
  const proto = loadPackageDefinition(packageDef);
  const deadline = new Date()
    .setTime(new Date().getTime() + 3600 * 1000)
    .toString();

  return new (proto.plugindata as any).DataManagement(
    host,
    credentials.createSsl(),
    {
      deadline,
    }
  );
};
