# Parent conversations (Mashq)

> Neither person gave permission to be quoted, so their answers are summarised below, not quoted.
> The confusing words are listed exactly as they said them (single words, not quotes).
> Do not use any line from these conversations as a quote in the app, slides, video or README.

## Who we asked and when

- Date: Saturday 31 October 2026.
- Who: two family members of the team (a mother / grandmother in her 60s, and a grandfather in his 70s). No names recorded.
- Asked by: Savera (Relative 1), Ahmer (Relative 2).
- Format: phone call, six questions.
- Permission to quote: **no** (both).

Questions asked:
1. What is one thing on your phone you avoid? Why?
2. What are you afraid might happen if you tap it?
3. When you ask for help, does the person teach you or just do it? How does that feel?
4. When you get stuck, what do you do next?
5. Which words or icons confuse you? (exact words)
6. Have you ever got a message or call that scared you? What did you do?

---

## Conversation 1: Relative 1 (called by Savera)

- Age range: 60s. Mother / grandmother, mostly at home.
- Permission to quote: no.

Summary of answers:
1. **Avoids:** mobile wallet and online banking apps. Worried that tapping the wrong option will move money out of the account without noticing.
2. **Fears:** losing savings or sending money to a stranger. Permission pop-ups (for example access to contacts) feel like someone is spying on the phone.
3. **Help:** children or grandchildren take the phone, fix it quickly and hand it back. This is frustrating: it keeps her dependent, and next time she has to ask again.
4. **When stuck:** goes back to the home screen, locks the phone, puts it aside and waits for the children to come home.
5. **Confusing words:** "Software Update" (worried it deletes voice messages or pictures), "Storage Full" (does not know what to delete without losing family photos), "Syncing / Cloud" (does not understand where photos go), "Three dots / Hamburger menu" (did not know extra options are hidden there). Also "Permissions" and "Access to Contacts".
6. **Scary message:** a message and a call saying she had won a prize, but had to pay a fee first. She hung up and asked her son to check whether it was real.

## Conversation 2: Relative 2 (called by Ahmer)

- Age range: 70s. Grandfather, semi-retired.
- Permission to quote: no.

Summary of answers:
1. **Avoids:** the phone's Settings and the app store, because everything is in fast English terms. Mainly uses the phone for voice notes and videos.
2. **Fears:** ruining the phone setup, such as changing the language to one he cannot read, turning off the ringtone and missing family calls, or deleting contacts permanently.
3. **Help:** family members do it for him because explaining "takes too long". This makes him feel helpless, as if technology is moving too fast for him.
4. **When stuck:** switches the phone off or restarts it; if it is still stuck, leaves it until a grandchild visits.
5. **Confusing words:** "Verify OTP" (the fast six-digit code messages), "Cache" / "Clear Cache" (worried it deletes photos), "Allow Access" (does not understand why an app needs his location), "Gear icon" (not clear it means settings).
6. **Scary message:** an automated call saying his SIM would be blocked within 24 hours unless he pressed 1 and verified his ID card. He ended the call and asked his son to check with a mobile shop.

---

## Top 3 patterns

1. **Help that does the task for them.** Both said family members take the phone and do it quickly. Both described the result as dependence or helplessness, and both stop and wait for family when stuck.
2. **Fear of a mistake that cannot be undone.** Losing money; ruining the phone setup; deleting photos, voice messages or contacts (Software Update, Storage Full, Clear Cache).
3. **Calls and messages that create panic.** A prize message asking for a fee, and an automated call threatening to block the SIM. Both ended the call and asked a son to check.

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

## Helper questions drawn from the conversations (`src/content/kb.ts`)

Short search phrases based on their worries, added as unattributed `variants` so the helper recognises them:

1. Tapping the wrong option and money moving out → `did_i_break_it`
2. Ruining the phone setup → `did_i_break_it`
3. A prize that needs a fee paid first → `prize_message`
4. SIM blocked in 24 hours unless you press 1 → `account_blocked`
5. "Verify OTP" → `what_is_otp`
6. Checking whether it was real → `check_if_real`
