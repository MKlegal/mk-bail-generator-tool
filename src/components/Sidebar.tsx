/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink, Phone, Shield, Scale, Search, FileText } from 'lucide-react';

const widgets = [
  {
    title: 'Explore More',
    items: [
      { label: 'Criminal Law Hub', href: '#' },
      { label: 'Bail Law Guide', href: '#' },
      { label: 'FIR Procedures', href: '#' },
    ],
    icon: <Scale className="w-4 h-4 text-accent" />,
  },
  {
    title: 'Legal Services',
    items: [
      { label: 'Smart Drafting', href: '#' },
      { label: 'Consult Senior Lawyer', href: '#' },
      { label: 'Inheritance Calc', href: '#' },
    ],
    icon: <FileText className="w-4 h-4 text-accent" />,
  },
  {
    title: 'Official Resources',
    items: [
      { label: 'Supreme Court', href: '#' },
      { label: 'High Court', href: '#' },
      { label: 'Pakistan Code', href: '#' },
      { label: 'NADRA Services', href: '#' },
    ],
    icon: <Shield className="w-4 h-4 text-accent" />,
  },
  {
    title: 'Emergency',
    items: [
      { label: '15 - Police', href: 'tel:15' },
      { label: '1099 - Legal Aid', href: 'tel:1099' },
    ],
    icon: <Phone className="w-4 h-4 text-accent" />,
  },
];

export default function Sidebar() {
  return (
    <aside className="space-y-3">
      {widgets.map((widget, i) => (
        <div key={i} className="widget-box p-3">
          <div className="flex items-center gap-2 mb-2">
            {widget.icon}
            <h3 className="text-[10px] uppercase font-bold text-accent tracking-widest">{widget.title}</h3>
          </div>
          <ul className="space-y-1.5 list-none opacity-80">
            {widget.items.map((item, j) => (
              <li key={j}>
                <a
                  href={item.href}
                  className="text-[11px] text-text-main hover:text-accent transition-colors flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-accent/40 rounded-full" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
