const { DisconnectReason, makeInMemoryStore, jidDecode, Browsers, normalizeMessageContent,generateMessageIDV2, WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType, useMultiFileAuthState, makeWASocket, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeWaSocket } = require("@adiwajshing/baileys")

function smsg(suc, m, store) {
  try {
    if (!m) return m;
    const M = proto.WebMessageInfo;

    if (m.key) {
      const { id, remoteJid, fromMe, participant } = m.key;
      m.id = id;
      m.isBaileys = id.startsWith('BAE5') && id.length === 16;
      m.chat = remoteJid;
      m.fromMe = fromMe;
      m.isGroup = m.chat.endsWith('@g.us');
      m.sender = suc.decodeJid(fromMe ? suc.user.id : participant || remoteJid);
      if (m.isGroup) m.participant = suc.decodeJid(participant) || '';
    }

    if (m.message) {
      m.mtype = getContentType(m.message);
      m.msg = m.mtype === 'viewOnceMessage'
        ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
        : m.message[m.mtype];

      m.body = m.message.conversation || m.msg.caption || m.msg.text || 
               (m.mtype === 'listResponseMessage' && m.msg.singleSelectReply?.selectedRowId) ||
               (m.mtype === 'buttonsResponseMessage' && m.msg.selectedButtonId) ||
               (m.mtype === 'viewOnceMessage' && m.msg.caption) ||
               m.text;

      const context = m.msg.contextInfo || {};
      m.mentionedJid = context.mentionedJid || [];

      if (context.quotedMessage) {
        let quotedType = getContentType(context.quotedMessage);
        let quotedMsg = context.quotedMessage[quotedType];

        if (quotedType === 'productMessage') {
          quotedType = getContentType(quotedMsg);
          quotedMsg = quotedMsg[quotedType];
        }

        if (typeof quotedMsg === 'string') quotedMsg = { text: quotedMsg };

        m.quoted = {
          mtype: quotedType,
          id: context.stanzaId,
          chat: context.remoteJid || m.chat,
          isBaileys: context.stanzaId?.startsWith('BAE5') && context.stanzaId.length === 16,
          sender: suc.decodeJid(context.participant),
          fromMe: suc.decodeJid(context.participant) === suc.decodeJid(suc.user.id),
          text: quotedMsg.text || quotedMsg.caption || quotedMsg.conversation || quotedMsg.contentText || quotedMsg.selectedDisplayText || quotedMsg.title || '',
          mentionedJid: context.mentionedJid || [],
          ...quotedMsg
        };

        const quotedVM = m.quoted.fakeObj = M.fromObject({
          key: { remoteJid: m.quoted.chat, fromMe: m.quoted.fromMe, id: m.quoted.id },
          message: context.quotedMessage,
          ...(m.isGroup ? { participant: m.quoted.sender } : {})
        });

        m.getQuotedObj = m.getQuotedMessage = async () => {
          if (!m.quoted.id) return false;
          const q = await store.loadMessage(m.chat, m.quoted.id, conn);
          return exports.smsg(conn, q, store);
        };

        m.quoted.delete = () => suc.sendMessage(m.quoted.chat, { delete: quotedVM.key });
        m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
          suc.copyNForward(jid, quotedVM, forceForward, options);
        m.quoted.download = () => suc.downloadMediaMessage(m.quoted);
      }
    }

    if (m.msg?.url) m.download = () => suc.downloadMediaMessage(m.msg);

    m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || '';

    m.reply = (text, chatId = m.chat, options = {}) => {
      return Buffer.isBuffer(text)
        ? suc.sendMedia(chatId, text, 'file', '', m, options)
        : suc.sendText(chatId, text, m, options);
    };

    m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) =>
      suc.copyNForward(jid, m, forceForward, options);

    return m;
  } catch (e) {
    console.error('Erro em smsg:', e);
  }
}                                 

module.exports = { smsg }   