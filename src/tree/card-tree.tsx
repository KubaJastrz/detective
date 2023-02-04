import { LinkVerticalLine as VisxLink } from '@visx/shape';
import { hierarchy, Tree } from '@visx/hierarchy';
import { Group } from '@visx/group';
import { HierarchyPointLink, HierarchyPointNode } from '@visx/hierarchy/lib/types';
import clsx from 'clsx';
import { TreeNode } from './types';
import { Card } from './card';

const example: TreeNode = {
  name: 'Start',
  children: [
    {
      name: '100',
    },
    {
      name: '101',
    },
    {
      name: '102',
      visited: true,
      children: [
        {
          name: '103',
          visited: true,
        },
        {
          name: '104',
        },
      ],
    },
  ],
};

interface Props {
  data?: TreeNode;
  screenWidth: number;
  screenHeight: number;
}

export function CardTree({ data = example, screenWidth, screenHeight }: Props) {
  const origin = {
    x: 0,
    y: 0,
  };

  const margin = 70;

  return (
    <svg width={screenWidth} height={screenHeight}>
      <Group top={margin} left={margin}>
        <Tree
          root={hierarchy(data, (d) => d.children)}
          size={[screenWidth - margin * 2, screenHeight - margin * 2]}
        >
          {(tree) => (
            <Group top={origin.y} left={origin.x}>
              {tree.links().map((link) => (
                <Link key={`${link.source.data.name}-${link.target.data.name}`} link={link} />
              ))}
              {tree.descendants().map((node) => (
                <Card key={node.data.name} node={node} />
              ))}
            </Group>
          )}
        </Tree>
      </Group>
    </svg>
  );
}

function Link({ link }: { link: HierarchyPointLink<TreeNode> }) {
  return <VisxLink data={link} className="fill-none stroke-slate-900 opacity-40 stroke-2" />;
}
