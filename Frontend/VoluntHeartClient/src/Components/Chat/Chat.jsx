import React, { useEffect, useRef } from "react";
import Talk from "talkjs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByEmail } from "../../Storage/Auth/Action";
import { api } from "../../config/APIconfig";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Chat = () => {
  const { auth } = useSelector((store) => store);
  const talkjsContainerRef = useRef(null);
  const { userSecret } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  useEffect(() => {
    dispatch(getUserByEmail(userSecret));
  }, [dispatch, userSecret]);

  useEffect(() => {
    let session;

    const initializeTalk = async () => {
      await Talk.ready;

      if (!auth.user) {
        console.error("User data is missing");
        return;
      }

      const me = new Talk.User({
        id: auth.user.userSecret,
        name: auth.user.fullName,
        photoUrl: auth.user.profilePic,
      });

      session = new Talk.Session({
        appId: "tdjK1fO6",
        me: me,
      });

      let conversation;
      const inbox = session.createInbox();

      if (auth.anotherUser) {
        const other = new Talk.User({
          id: auth.anotherUser.userSecret,
          name: auth.anotherUser.fullName,
          photoUrl: auth.anotherUser.profilePic,
        });

        conversation = session.getOrCreateConversation(
          Talk.oneOnOneId(me, other)
        );

        conversation.setParticipant(me);
        conversation.setParticipant(other);
      } else {
        conversation = session.getOrCreateConversation(Talk.oneOnOneId(me));
        conversation.setParticipant(me);
      }

      inbox.select(conversation);

      inbox.onCustomConversationAction("delete", (event) => {
        deleteMessage(event.conversation.id);
      });

      if (talkjsContainerRef.current) {
        inbox.mount(talkjsContainerRef.current);
      }
    
      session.unreads.onChange((unreadConversations) => {
        const amountOfUnreads = unreadConversations.length;
        console.log("unread form chat", amountOfUnreads);
      });
    };
      initializeTalk();


    return () => {
      if (session) {
        session.destroy();
      }
    };
  }, [auth]);

  const deleteMessage = async (conversationId) => {
    try {
      await api.delete("api/messages/delete", {
        data: { conversationId },
      });
      alert("Message deleted successfully");
    } catch (error) {
      console.error("Failed to delete message", error);
    }
  };

  return (
    <div className="h-full w-full mt-6 px-2 bg-white rounded-xl" > 
    <div className="flex items-center sticky top-5 bg-opacity-95 mt-3 mb-1 ">
        <ArrowBackIcon className="cursor-pointer" onClick={handleBack} />
        <h1
          className="text-lg opacity-90 ml-2 cursor-pointer"
          onClick={handleBack}
        >
          Back
        </h1>
      </div>
      <h2 className="text-lg font-bold opacity-90 mt-1 mb-2 pl-1">Chats</h2>
      <div
        id="talkjs-container"
        style={{ height: "86%", width: "100%" }}
        ref={talkjsContainerRef}
      ></div>
    </div>
  );
};

export default Chat;
