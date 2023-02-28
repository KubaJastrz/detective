import { Group } from '@visx/group';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { Text } from '@visx/text';
import clsx from 'clsx';
import { TreeNode } from './types';

export function Card({ node }: { node: HierarchyPointNode<TreeNode> }) {
  return node.depth === 0 ? <RootCard node={node} /> : <ChildCard node={node} />;
}

function RootCard({ node }: { node: HierarchyPointNode<TreeNode> }) {
  const { name } = node.data;

  const width = 140;
  const height = 60;

  return (
    <Group top={node.y} left={node.x}>
      <rect
        height={height}
        width={width}
        y={-height / 2}
        x={-width / 2}
        className="fill-slate-800"
        strokeWidth={0}
        rx={6}
      />
      <Text
        verticalAnchor="middle"
        textAnchor="middle"
        className="pointer-events-none select-none fill-current font-semibold tracking-wide"
      >
        {name}
      </Text>
    </Group>
  );
}

function ChildCard({ node }: { node: HierarchyPointNode<TreeNode> }) {
  const { name, visited = false } = node.data;
  const number = `${node.depth !== 0 && '#'}${name}`;

  const width = 110;
  const height = 60;

  const classes = /* tw */ clsx({
    'fill-sky-700': visited,
    'fill-slate-900': !visited,
    'stroke-[rgba(15,23,42,0.6)]': visited,
  });

  return (
    <Group top={node.y} left={node.x}>
      <rect
        height={height}
        width={width}
        y={-height / 2}
        x={-width / 2}
        className={classes}
        strokeWidth={3}
        rx={6}
      />
      <Text
        verticalAnchor="middle"
        textAnchor="middle"
        className="pointer-events-none select-none fill-current font-mono text-base font-bold tracking-wide"
      >
        {number}
      </Text>
    </Group>
  );
}
