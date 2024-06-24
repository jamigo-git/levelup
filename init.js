// const fs = require('fs')
import * as fs from 'node:fs';

fs.copyFileSync('.env.sample', '.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })
