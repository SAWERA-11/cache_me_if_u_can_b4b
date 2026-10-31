# Parent conversations (Mashq)

> Notes as collected by Savera. Words are kept as given; only spelling is fixed.
> Real organisation names below are the respondents' own words. They stay in these notes only: never in the app, slides or video.

## Who we asked and when

- Date: Saturday 31 October 2026.
- Who: two conversations with family members of the team (a mother or grandmother in her 60s, and a grandfather in his 70s). No names recorded.
- Asked by: TODO(content): which team member held each call.
- Format: short conversation, six questions.

Questions asked:
1. What is one thing on your phone you avoid? Why?
2. What are you afraid might happen if you tap it?
3. When you ask for help, does the person teach you or just do it? How does that feel?
4. When you get stuck, what do you do next?
5. Which words or icons confuse you? (exact words)
6. Have you ever got a message or call that scared you? What did you do?

---

## Conversation 1: Relative 1

- Age range: 60s. Urban mother / grandmother, home-centric.
- Permission to quote: **not recorded**. TODO(content): confirm before quoting anywhere.
- What they avoid: mobile wallet and online banking apps.
- What they fear: losing savings or sending money to a stranger by tapping the wrong option; permission pop-ups feel like spying or hacking.
- Help: family members do it for them; leaves them dependent.
- When stuck: goes back to the home screen, locks the phone, waits for the children.
- Confusing words or icons: "Software Update", "Storage Full", "Syncing / Cloud", "Three dots / Hamburger menu" (also "Permissions", "Access to Contacts" from Q2).
- Message or call that scared them: a prize message and call asking for a fee first.

Verbatim lines:

1. "I completely avoid opening EasyPaisa / JazzCash or Online Banking apps myself. I'm always worried that if I tap the wrong option, money will automatically transfer out or get deducted from my account without me realizing."
2. "I'm terrified I'll lose my life savings or accidentally send money to a stranger. Also, when updates pop up asking for 'Permissions' or 'Access to Contacts,' I feel like someone is spying on my phone or trying to hack it."
3. "My kids or grandkids usually just snatch the phone, tap it super fast in two seconds, hand it back, and say 'Ho gaya, Ammi/Dadi!' It feels very frustrating because I remain completely dependent on them. Next time the issue happens, I have to ask all over again."
4. "I immediately press the middle round button to go back to the home screen, lock the display, and set the phone aside. I just wait until one of the kids comes home in the evening to fix it."
5. Confusing words:
   - "Software Update" (I worry it will delete my Urdu voice messages or pictures).
   - "Storage Full" (I don't know what to delete without losing family photos).
   - "Syncing / Cloud" (I don't understand where my photos go if they leave the phone).
   - "Three dots / Hamburger menu" (I never know that extra options are hidden behind those lines).
6. "Yes, I got a WhatsApp message and a call saying I won 50,000 Rupees from Jeeto Pakistan / BISP, but I needed to transfer 2,000 Rupees tax fee first. I panicked, hung up, and immediately handed the phone to my son to check if it was real."

## Conversation 2: Relative 2

- Age range: 70s. Grandfather, semi-retired.
- Permission to quote: **not recorded**. TODO(content): confirm before quoting anywhere.
- What they avoid: the Settings menu and the app store; uses the phone mainly for voice notes and videos.
- What they fear: ruining the phone setup (language, ringtone) or deleting contacts permanently.
- Help: family members do it for them because explaining "takes too long"; feels helpless.
- When stuck: switches the phone off or restarts it, then waits for a grandchild.
- Confusing words or icons: "Verify OTP", "Cache" / "Clear Cache", "Allow Access", "Gear icon".
- Message or call that scared them: an automated call saying the SIM would be blocked unless they pressed 1 and verified their ID card.

Verbatim lines:

1. "I avoid the Settings menu and Google Play Store. Everything is written in fast English terms. I mostly stick to WhatsApp for voice notes and YouTube for news or bayaan (religious lectures)."
2. "I am afraid I will ruin the phone setup, like changing the language to something I can't read, turning off my ringtone so I miss important family calls, or deleting my WhatsApp contacts permanently."
3. "They just do it for me because they say explaining it takes too long. It makes me feel helpless and old, like technology is moving too fast for my generation to keep up."
4. "I power off the phone completely or restart it. If it stays stuck, I leave it on the table until my grandchild visits and asks me to show them what happened."
5. Confusing words:
   - "Verify OTP" (The fast 6-digit code messages confuse me).
   - "Cache" (I see 'Clear Cache' and worry it means deleting my photos).
   - "Allow Access" (I don't know why a news or Quran app needs access to my location).
   - "Gear icon" (It's not clear that the small wheel icon means device configuration).
6. "I received an automated voice call claiming my SIM card would be blocked by PTA within 24 hours unless I pressed 1 and verified my CNIC. I got very stressed, ended the call, and asked my son to check with the mobile shop."

---

## Top 3 patterns

1. **Help that does the task for them.** Both said family members take the phone and do it quickly. Both described the result as dependence or helplessness ("I have to ask all over again"; "helpless and old"). When stuck, both stop and wait for a family member.
2. **Fear of a mistake that cannot be undone.** Losing money or sending it to a stranger; ruining the phone setup; deleting photos, voice messages or contacts (Software Update, Storage Full, Clear Cache).
3. **Calls and messages that create panic.** One prize message asking for a fee, one automated call threatening to block the SIM. Both hung up and asked a son to check.

## Confusing words (feed for the glossary)

| Word as said | Said by | In glossary? |
|---|---|---|
| Software Update | Relative 1 | yes (`update`) |
| Storage Full | Relative 1 | yes (`storage_full`, added) |
| Syncing | Relative 1 | yes (`sync`, added) |
| Cloud | Relative 1 | yes (`cloud`, added) |
| Three dots / Hamburger menu | Relative 1 | yes (`menu`, added) |
| Permissions / Access to Contacts | Relative 1 | yes (`allow_access`, added) |
| Verify OTP | Relative 2 | yes (`otp`) |
| Cache / Clear Cache | Relative 2 | yes (`cache`, added) |
| Allow Access | Relative 2 | yes (`allow_access`, added) |
| Gear icon | Relative 2 | yes (`settings`, added) |

## Real questions for the helper (feed for `src/content/kb.ts`)

Phrases from the notes added as `variants` on the matching KB entry:

1. "tap the wrong option and money will transfer out" → `did_i_break_it`
2. "ruin the phone setup" → `did_i_break_it`
3. "won 50,000 rupees but need to pay a tax fee first" → `prize_message`
4. "SIM card will be blocked in 24 hours, press 1 and verify CNIC" → `account_blocked`
5. "verify otp" → `what_is_otp`
6. "check if it was real" → `check_if_real`
