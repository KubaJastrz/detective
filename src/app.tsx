import { withScreenSize } from '@visx/responsive';
import { CardTree as _CardTree } from './tree';

// @ts-expect-error
const CardTree = withScreenSize(_CardTree);

export function App() {
  return <CardTree />;
}
