import {create}  from 'zustand';

// Helper function to safely parse JSON or return a default value
const safeParse = (key, defaultValue) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.error(`Failed to parse ${key} from localStorage:`, error);
        return defaultValue;
    }
};

const useStore = create((set) => ({
    user: safeParse('user', null),
    setUser: (val) => {
        localStorage.setItem('user', JSON.stringify(val));
        set({ user: val });
    },

    token: safeParse('token', ""),
    setToken: (val) => {
        localStorage.setItem('token', JSON.stringify(val));
        set({ token: val });
    },

    username: safeParse('username', ""),
    setUsername: (val) => {
        localStorage.setItem('username', JSON.stringify(val));
        set({ username: val });
    },

    activeConversationsNum: safeParse('activeConversationsNum', null),
    setActiveConversationsNum: (val) => {
        localStorage.setItem('activeConversationsNum', JSON.stringify(val));
        set({ activeConversationsNum: val });
    },

    activeConversations: safeParse('activeConversations', null),
    setActiveConversations: (val) => {
        localStorage.setItem('activeConversations', JSON.stringify(val));
        set({ activeConversations: val });
    },

    messages: safeParse('messages', []),
    setMessages: (val) => {
        localStorage.setItem('messages', JSON.stringify(val));
        set({ messages: val });
    },

    selectedConversation: safeParse('selectedConversation', null),
    setSelectedConversation: (val) => {
        localStorage.setItem('selectedConversation', JSON.stringify(val));
        set({ selectedConversation: val });
    },

    trigger: safeParse('trigger', false),
    setTrigger: (val) => {
        localStorage.setItem('trigger', JSON.stringify(val));
        set({ trigger: val });
    },
}));

export default useStore;
