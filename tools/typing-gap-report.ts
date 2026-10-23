import { formatTypingGapReport, loadReport } from '../src/typing-gap.ts';

const args = process.argv.slice(2);
const rootIndex = args.indexOf('--root');
if (rootIndex !== -1 && !args[rootIndex + 1]) throw new Error('--root requires a directory');
const report = await loadReport(rootIndex === -1 ? undefined : args[rootIndex + 1]);
console.log(args.includes('--json') ? JSON.stringify(report, null, 2) : formatTypingGapReport(report).trimEnd());
