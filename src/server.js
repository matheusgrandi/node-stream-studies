/*
Types of stream:
[X] readable stream: incoming data
[X] writable stream: outcoming data (last step of the pipeline)
[X] transform stream: data processing
*/
import http from 'http';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';

const PORT = 3334;

// const myDB = async () =>
//   new Array.from({ length: 100 }, (v, k) => `Matheus-${k}`);

function* run() {
  for (let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `Matheus-${index}`,
    };
    yield data;
  }
}

async function handler(request, response) {
  const readable = new Readable({
    read() {
      for (const data of run()) {
        console.log('sending', data);
        this.push(JSON.stringify(data) + '\n');
      }
      // to inform that the data is over
      this.push(null);
    },
  });

  readable.pipe(response);
}

http
  .createServer(handler)
  .listen(PORT)
  .on('listening', () => console.log(`🚀 Server is running on ${PORT}`));
