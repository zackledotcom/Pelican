import React from "react";
import { motion } from "framer-motion";

/**
 * MessageBubble component
 * Supports sender distinction (user/ai), accessibility, and both string/ReactNode content.
 * If you want TypeScript, rename to .tsx and add types.
 */
const MessageBubble = ({ content, sender = "user" }) => {
  const isAI = sender === "ai";
  return (
    <motion.div
      className={`message-bubble ${isAI ? "ai-message" : "user-message"}`}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      role={isAI ? "status" : "none"}
      aria-live={isAI ? "polite" : "off"}
      aria-label={`${isAI ? "AI" : "User"} message: ${typeof content === 'string' ? content : 'Message content'}`}
      tabIndex={0}
    >
      <div className="bubble-inner">
        {typeof content === 'string' ? content : (
          <div className="complex-content">
            {content}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
