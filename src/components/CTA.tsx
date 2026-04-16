/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageCircle, Play } from 'lucide-react';

export default function CTA({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-20 text-center">
      <h2 className="font-cinzel text-3xl md:text-4xl text-white mb-8">Ready to Generate Your Bail Petition?</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onStart}
          className="bg-gold text-navy font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gold/90 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-gold/20"
        >
          <Play className="w-5 h-5 fill-current" />
          Start Generating Now
        </button>
        <a
          href="https://wa.me/923414834719"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-green-700 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-green-900/40"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Us
        </a>
      </div>
    </section>
  );
}
