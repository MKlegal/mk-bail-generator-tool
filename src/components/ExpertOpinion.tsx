/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function ExpertOpinion() {
  return (
    <footer className="h-[138px] bg-black/30 border-t border-border-gold flex items-center px-6 gap-8 overflow-hidden">
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="w-[60px] h-[60px] rounded-full border-2 border-accent overflow-hidden bg-[#333]">
           <img
            src="https://mklegalhub.com/wp-content/uploads/2026/03/Senior-Counsel-cheif-Attah-Baloch.jpeg"
            alt="Chief Atta Ullah Baloch"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden sm:block">
          <h4 className="font-georgia text-accent text-base font-bold">Chief Atta Ullah Baloch</h4>
          <p className="text-xs opacity-70">Senior Criminal Expert</p>
        </div>
      </div>
      
      <div className="flex-1 italic text-xs md:text-sm leading-relaxed border-l-3 border-accent pl-4 opacity-90 line-clamp-3">
        "This generator captures the precise legal formatting required by Pakistani courts. I have personally reviewed these grounds to ensure they meet High Court standards."
      </div>

      <a 
        href="https://wa.me/923414834719" 
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex bg-accent text-bg px-5 py-2 rounded-md font-bold text-sm whitespace-nowrap hover:opacity-90 transition-opacity"
      >
        WhatsApp Consultation
      </a>
    </footer>
  );
}
