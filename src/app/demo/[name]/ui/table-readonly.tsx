'use client';

import {
  BoardTitle,
  Lines,
  Metric,
} from '@/app/demo/[name]/ui/table-starter-parts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const usageRows = [
  [
    'Lorem ipsum',
    '1,284',
    '+12.4%',
    '48.3M',
    '+10.2%',
    '312.3',
    '+8.2%',
    '$4,850.10',
    '+6.1%',
    '1 min ago',
  ],
  [
    'Dolor sit',
    '962',
    '-1.1%',
    '21.7M',
    '-0.4%',
    '268.0',
    '-2.4%',
    '$3,115.40',
    '-1.2%',
    '5 hours ago',
  ],
  [
    'Amet elit',
    '768',
    '-4.8%',
    '22.0M',
    '-2.1%',
    '141.2',
    '-3.5%',
    '$2,030.75',
    '-3.3%',
    'Yesterday',
  ],
  [
    'Sed tempor',
    '421',
    '+2.6%',
    '12.8M',
    '+4.4%',
    '88.6',
    '+0.2%',
    '$1,902.20',
    '+2.8%',
    '2 days ago',
  ],
  [
    'Magna aliqua',
    '190',
    '-18.1%',
    '5.1M',
    '-7.0%',
    '32.4',
    '-9.4%',
    '$514.90',
    '-14.7%',
    '12 Sep 2026',
  ],
  [
    'Lorem total',
    '3,609',
    '+6.0%',
    '120.0M',
    '+5.2%',
    '782.7',
    '+1.9%',
    '$11,993.35',
    '-0.8%',
    '—',
  ],
];

export function TableUsageSummary() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BoardTitle detail="Lorem ipsum dolor sit amet" title="Lorem ipsum" />
      <Table readOnly>
        <TableHeader>
          <TableRow>
            <TableHead>Team</TableHead>
            <TableHead align="end">Runs</TableHead>
            <TableHead align="end">Tokens</TableHead>
            <TableHead align="end">Compute hours</TableHead>
            <TableHead align="end">Cost</TableHead>
            <TableHead>Last updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usageRows.map(row => (
            <TableRow key={row[0]}>
              <TableCell>{row[0]}</TableCell>
              <TableCell align="end">
                <Metric delta={row[2]} value={row[1]} />
              </TableCell>
              <TableCell align="end">
                <Metric delta={row[4]} value={row[3]} />
              </TableCell>
              <TableCell align="end">
                <Metric delta={row[6]} value={row[5]} />
              </TableCell>
              <TableCell align="end">
                <Metric delta={row[8]} value={row[7]} />
              </TableCell>
              <TableCell>{row[9]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const roadmapRows = [
  [
    'LI',
    'Lorem ipsum dolor',
    'Sit amet consectetur adipiscing',
    'Aug 20, 2024',
    'Jan 14, 2027',
    'Lorem ipsum dolor sit amet',
  ],
  [
    'DS',
    'Dolor sit amet',
    'Consectetur adipiscing elit sed',
    'Sep 3, 2026',
    'Dec 2, 2026',
    'Do eiusmod tempor incididunt',
  ],
  [
    'AC',
    'Amet consectetur',
    'Adipiscing elit sed do eiusmod',
    'Oct 3, 2026',
    'Oct 30, 2026',
    'Ut labore et dolore magna aliqua',
  ],
  [
    'ES',
    'Elit sed eiusmod',
    'Tempor incididunt ut labore',
    'Jan 19, 2026',
    'Mar 18, 2027',
    'Enim ad minim veniam quis',
  ],
  [
    'MA',
    'Magna aliqua ut',
    'Enim ad minim veniam nostrud',
    'Jul 22, 2020',
    'Jun 28, 2027',
    'Exercitation ullamco laboris nisi',
  ],
];

export function TableRoadmap() {
  return (
    <div className="flex w-full flex-col gap-4">
      <BoardTitle detail="Lorem ipsum dolor sit amet" title="Lorem ipsum" />
      <Table readOnly>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Release</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roadmapRows.map(row => (
            <TableRow key={row[1]}>
              <TableCell>
                <span className="flex items-center gap-3">
                  <Avatar size="default">
                    <AvatarFallback>{row[0]}</AvatarFallback>
                  </Avatar>
                  <Lines primary={row[1]} secondary={row[2]} />
                </span>
              </TableCell>
              <TableCell>{row[3]}</TableCell>
              <TableCell>{row[4]}</TableCell>
              <TableCell>{row[5]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
