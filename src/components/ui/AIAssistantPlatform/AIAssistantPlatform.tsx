'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import styles from './AIAssistantPlatform.module.css';
import { Portal } from '@/components/ui/Portal/Portal';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

interface ContextPill {
  id: string;
  type: string;
  name: string;
}

interface PromptPill {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

interface AIAssistantPlatformProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const AIAssistantPlatform: React.FC<AIAssistantPlatformProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', text: "Hello! How can I assist you today? I'm here to help with writing, research, analysis, and more." }
  ]);
  const [contextPills, setContextPills] = useState<ContextPill[]>([]);
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [chatInput, setChatInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [activeModel, setActiveModel] = useState('SchoolScout');
  const [showPromptsInline, setShowPromptsInline] = useState(false);
  const [showCollectionsInline, setShowCollectionsInline] = useState(false);
  const [showAllPromptsInline, setShowAllPromptsInline] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [activePanelAction, setActivePanelAction] = useState('chatBtn');
  const [showContextModal, setShowContextModal] = useState(false);
  const [showCollectionsModal, setShowCollectionsModal] = useState(false);
  const [contextTab, setContextTab] = useState<'tabs' | 'collections'>('tabs');
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
  const [draggedPrompt, setDraggedPrompt] = useState<number | null>(null);
  const [collectionsItemsView, setCollectionsItemsView] = useState<string | null>(null);
  const [selectedCollectionItems, setSelectedCollectionItems] = useState<string[]>([]);
  const [showCreatePromptModal, setShowCreatePromptModal] = useState(false);
  const [contextCollectionView, setContextCollectionView] = useState<string | null>(null);
  const [promptForm, setPromptForm] = useState({
    name: '',
    text: '',
    model: 'GPT-4o mini',
    access: 'Accessible to everyone'
  });
  
  const panelRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Icon renderer function matching CodePen icons
  const renderIcon = (iconName: string, className: string = "w-3.5 h-3.5") => {
    switch (iconName) {
      case 'write':
        return (
          <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        );
      case 'translate':
        return (
          <svg className={className} color="currentColor" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.5 13.5C7.5 12.2574 8.50736 11.25 9.75 11.25H20.25C21.4926 11.25 22.5 12.2574 22.5 13.5V20.25C22.5 21.4926 21.4926 22.5 20.25 22.5H9.75C8.50736 22.5 7.5 21.4926 7.5 20.25V13.5ZM9.75 12.75C9.33579 12.75 9 13.0858 9 13.5V20.25C9 20.6642 9.33579 21 9.75 21H20.25C20.6642 21 21 20.6642 21 20.25V13.5C21 13.0858 20.6642 12.75 20.25 12.75H9.75Z" fill="currentColor" />
            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 3.75C1.5 2.50736 2.50736 1.5 3.75 1.5H14.25C15.4926 1.5 16.5 2.50736 16.5 3.75V8.98125C16.5 9.39546 16.1642 9.73125 15.75 9.73125C15.3358 9.73125 15 9.39546 15 8.98125V3.75C15 3.33579 14.6642 3 14.25 3H3.75C3.33579 3 3 3.33579 3 3.75V10.5C3 10.9142 3.33579 11.25 3.75 11.25H5.25C5.66421 11.25 6 11.5858 6 12C6 12.4142 5.66421 12.75 5.25 12.75H3.75C2.50736 12.75 1.5 11.7426 1.5 10.5V3.75Z" fill="currentColor" />
            <path d="M11.9524 9.23985C12.0473 9.48556 11.866 9.75 11.6026 9.75H10.9772C10.8203 9.75 10.6799 9.65224 10.6255 9.505L10.2471 8.48109H7.70762L7.33713 9.50283C7.28334 9.6512 7.14241 9.75 6.98459 9.75H6.39488C6.13188 9.75 5.95058 9.48631 6.04474 9.24075L8.05773 3.99075C8.11333 3.84573 8.25257 3.75 8.40787 3.75H9.57409C9.72904 3.75 9.86804 3.84531 9.92389 3.98985L11.9524 9.23985ZM8.48627 6.31303L8.07925 7.43067H9.85776L9.44189 6.31303C9.28262 5.87605 9.12335 5.42227 8.98178 4.93487H8.94639C8.79596 5.39706 8.63669 5.87605 8.48627 6.31303Z" fill="currentColor" />
            <path d="M14.25 15L12.375 15C12.1679 15 12 15.1679 12 15.375L12 16.125C12 16.3321 12.1679 16.5 12.375 16.5H14.2408C14.1972 17.196 14.0001 17.7265 13.6992 18.0848C13.4245 18.4117 13.0088 18.6607 12.3743 18.7304C12.1684 18.753 12 18.9179 12 19.125V19.875C12 20.0821 12.1683 20.2517 12.3748 20.2362C13.4141 20.1584 14.2581 19.7516 14.8477 19.0496C14.9011 18.986 14.9518 18.9207 15 18.8538C15.0482 18.9207 15.0989 18.986 15.1523 19.0496C15.7419 19.7516 16.5859 20.1584 17.6252 20.2362C17.8317 20.2517 18 20.0821 18 19.875V19.125C18 18.9179 17.8316 18.753 17.6257 18.7304C16.9912 18.6607 16.5755 18.4117 16.3008 18.0848C15.9999 17.7265 15.8028 17.196 15.7592 16.5H17.625C17.8321 16.5 18 16.3321 18 16.125L18 15.375C18 15.1679 17.8321 15 17.625 15L15.75 15V13.875C15.75 13.6679 15.5821 13.5 15.375 13.5H14.625C14.4179 13.5 14.25 13.6679 14.25 13.875V15Z" fill="currentColor" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M16.0402 2.26367V6.58367M7.40021 2.26367V6.58367M2.00021 9.82367H21.4402M19.28 4.42367H4.16C2.9666 4.42367 2 5.39027 2 6.58367V20.6237C2 21.8171 2.9666 22.7837 4.16 22.7837H19.28C20.4734 22.7837 21.44 21.8171 21.44 20.6237V6.58367C21.44 5.39027 20.4734 4.42367 19.28 4.42367Z" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M11.5389 13.5337C11.3899 13.5337 11.2689 13.6546 11.27 13.8037C11.27 13.9527 11.391 14.0737 11.54 14.0737C11.689 14.0737 11.81 13.9527 11.81 13.8037C11.81 13.6546 11.689 13.5337 11.5389 13.5337" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M17.5389 13.5337C17.3899 13.5337 17.2689 13.6546 17.27 13.8037C17.27 13.9527 17.391 14.0737 17.54 14.0737C17.689 14.0737 17.81 13.9527 17.81 13.8037C17.81 13.6546 17.689 13.5337 17.5389 13.5337" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M6.53892 17.5337C6.38988 17.5337 6.26892 17.6546 6.27 17.8037C6.27 17.9527 6.39096 18.0737 6.54 18.0737C6.68904 18.0737 6.81 17.9527 6.81 17.8037C6.81 17.6546 6.68904 17.5337 6.53892 17.5337" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M6.53892 13.5337C6.38988 13.5337 6.26892 13.6546 6.27 13.8037C6.27 13.9527 6.39096 14.0737 6.54 14.0737C6.68904 14.0737 6.81 13.9527 6.81 13.8037C6.81 13.6546 6.68904 13.5337 6.53892 13.5337" />
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="currentColor" d="M11.5389 17.5337C11.3899 17.5337 11.2689 17.6546 11.27 17.8037C11.27 17.9527 11.391 18.0737 11.54 18.0737C11.689 18.0737 11.81 17.9527 11.81 17.8037C11.81 17.6546 11.689 17.5337 11.5389 17.5337" />
          </svg>
        );
      case 'all':
        return (
          <svg className={className} strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path d="M4 4h6v6h-6z" />
            <path d="M14 4h6v6h-6z" />
            <path d="M4 14h6v6h-6z" />
            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          </svg>
        );
      case 'summarize':
        return (
          <svg className={className} fill="currentColor" viewBox="0 -960 960 960">
            <path d="M280-520v-80H520v80H280Zm0,160v-80H840v80H280Zm0,160v-80H840v80H280ZM160-520q-17,0-28.5-11.5T120-560t11.5-28.5T160-600t28.5,11.5T200-560t-11.5,28.5T160-520Zm0,160q-17,0-28.5-11.5T120-400t11.5-28.5T160-440t28.5,11.5T200-400t-11.5,28.5T160-360Zm0,160q-17,0-28.5-11.5T120-240t11.5-28.5T160-280t28.5,11.5T200-240t-11.5,28.5T160-200ZM700-480q0-92 64-156t156-64q-92,0-156-64T700-920q0,92-64,156T480-700q92,0 156,64t64,156Z" />
          </svg>
        );
      case 'analyze':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3.71863 3.71841C4.25138 3.18562 4.97399 2.88635 5.72738 2.88635H18.2728C19.0262 2.88635 19.7488 3.18561 20.2816 3.71841C20.8145 4.25117 21.1137 4.97382 21.1137 5.72726V18.2727C21.1137 19.0261 20.8145 19.7487 20.2817 20.2815C20.2817 20.2815 20.2817 20.2815 20.2816 20.2815C20.2816 20.2815 20.2816 20.2816 20.2816 20.2816C19.7488 20.8144 19.0262 21.1136 18.2728 21.1136H5.72738C4.97394 21.1136 4.25129 20.8143 3.71853 20.2815C3.18574 19.7487 2.88647 19.0261 2.88647 18.2727V5.72726C2.88647 4.97387 3.18574 4.25126 3.71853 3.71851C3.71856 3.71848 3.7186 3.71844 3.71863 3.71841ZM5.72738 4.38635C5.37173 4.38635 5.03068 4.52763 4.77929 4.77907L4.77919 4.77917C4.52776 5.03056 4.38647 5.37161 4.38647 5.72726V18.2727C4.38647 18.6284 4.52776 18.9694 4.77919 19.2208L4.77929 19.2209C5.03068 19.4723 5.37173 19.6136 5.72738 19.6136H18.2728C18.6285 19.6136 18.9695 19.4723 19.2209 19.2209L19.221 19.2208C19.4725 18.9694 19.6137 18.6284 19.6137 18.2727V5.72726C19.6137 5.37161 19.4725 5.03056 19.221 4.77917L19.2209 4.77907C18.9695 4.52764 18.6285 4.38635 18.2728 4.38635H5.72738ZM16.1819 7.06817C16.5961 7.06817 16.9319 7.40396 16.9319 7.81817V16.1818C16.9319 16.596 16.5961 16.9318 16.1819 16.9318C15.7677 16.9318 15.4319 16.596 15.4319 16.1818V7.81817C15.4319 7.40396 15.7677 7.06817 16.1819 7.06817ZM12.0001 10.2045C12.4143 10.2045 12.7501 10.5403 12.7501 10.9545V16.1818C12.7501 16.596 12.4143 16.9318 12.0001 16.9318C11.5859 16.9318 11.2501 16.596 11.2501 16.1818V10.9545C11.2501 10.5403 11.5859 10.2045 12.0001 10.2045ZM7.81829 13.3409C8.23251 13.3409 8.56829 13.6767 8.56829 14.0909V16.1818C8.56829 16.596 8.23251 16.9318 7.81829 16.9318C7.40408 16.9318 7.06829 16.596 7.06829 16.1818V14.0909C7.06829 13.6767 7.40408 13.3409 7.81829 13.3409Z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        );
      case 'files':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24">
            <g>
              <path fillRule="evenodd" clipRule="evenodd" d="M3.09998 5.0001C3.09998 2.84619 4.84607 1.1001 6.99998 1.1001H17C19.1539 1.1001 20.9 2.84619 20.9 5.0001V8.0001C20.9 8.49715 20.497 8.9001 20 8.9001C19.5029 8.9001 19.1 8.49715 19.1 8.0001V5.0001C19.1 3.8403 18.1598 2.9001 17 2.9001H6.99998C5.84018 2.9001 4.89998 3.8403 4.89998 5.0001V19.0001C4.89998 20.1599 5.84018 21.1001 6.99998 21.1001H11C11.497 21.1001 11.9 21.503 11.9 22.0001C11.9 22.4972 11.497 22.9001 11 22.9001H6.99998C4.84606 22.9001 3.09998 21.154 3.09998 19.0001V5.0001ZM6.90002 7.53367C6.90002 7.03661 7.30297 6.63367 7.80002 6.63367H16.2684C16.7654 6.63367 17.1684 7.03661 17.1684 7.53367C17.1684 8.03072 16.7654 8.43367 16.2684 8.43367H7.80002C7.30297 8.43367 6.90002 8.03072 6.90002 7.53367ZM19.5 12.9001C19.1686 12.9001 18.9 13.1687 18.9 13.5001V19.0001C18.9 19.4972 18.497 19.9001 18 19.9001C17.5029 19.9001 17.1 19.4972 17.1 19.0001V13.5001C17.1 12.1746 18.1745 11.1001 19.5 11.1001C20.8255 11.1001 21.9 12.1746 21.9 13.5001V19.0001C21.9 21.154 20.1539 22.9001 18 22.9001C15.8461 22.9001 14.1 21.154 14.1 19.0001V15.0001C14.1 14.503 14.5029 14.1001 15 14.1001C15.497 14.1001 15.9 14.503 15.9 15.0001V19.0001C15.9 20.1599 16.8402 21.1001 18 21.1001C19.1598 21.1001 20.1 20.1599 20.1 19.0001V13.5001C20.1 13.1687 19.8313 12.9001 19.5 12.9001ZM6.90002 12.0325C6.90002 11.5354 7.30297 11.1325 7.80002 11.1325H12.2684C12.7654 11.1325 13.1684 11.5354 13.1684 12.0325C13.1684 12.5295 12.7654 12.9325 12.2684 12.9325H7.80002C7.30297 12.9325 6.90002 12.5295 6.90002 12.0325Z" fill="currentColor" />
            </g>
          </svg>
        );
      case 'delete':
        return (
          <svg className={className} viewBox="0 0 16 16">
            <g>
              <path fillRule="evenodd" clipRule="evenodd" d="M7.44306 0.733399H8.55693C8.91018 0.733389 9.21096 0.733381 9.45792 0.753558C9.71736 0.774755 9.96975 0.821177 10.211 0.94412C10.5748 1.12948 10.8706 1.42524 11.0559 1.78902C11.1789 2.03031 11.2253 2.2827 11.2465 2.54214C11.2659 2.779 11.2666 3.06538 11.2667 3.40007H14C14.3314 3.40007 14.6 3.6687 14.6 4.00007C14.6 4.33144 14.3314 4.60007 14 4.60007H13.2667V11.4919C13.2667 12.0306 13.2667 12.4711 13.2374 12.8292C13.2071 13.1998 13.1426 13.5345 12.9833 13.8471C12.734 14.3363 12.3363 14.7341 11.847 14.9833C11.5344 15.1426 11.1997 15.2072 10.8291 15.2375C10.4711 15.2667 10.0305 15.2667 9.4918 15.2667H6.50819C5.96949 15.2667 5.52892 15.2667 5.17087 15.2375C4.80026 15.2072 4.46554 15.1426 4.15295 14.9833C3.66373 14.7341 3.26598 14.3363 3.01671 13.8471C2.85744 13.5345 2.79285 13.1998 2.76257 12.8292C2.73331 12.4711 2.73332 12.0306 2.73333 11.4919L2.73333 4.60007H1.99999C1.66862 4.60007 1.39999 4.33144 1.39999 4.00007C1.39999 3.6687 1.66862 3.40007 1.99999 3.40007H4.73333C4.73335 3.06538 4.73413 2.779 4.75349 2.54214C4.77468 2.2827 4.82111 2.03031 4.94405 1.78902C5.1294 1.42524 5.42517 1.12948 5.78895 0.94412C6.03023 0.821177 6.28263 0.774755 6.54207 0.753558C6.78903 0.733381 7.08981 0.733389 7.44306 0.733399ZM3.93333 4.60007V11.4667C3.93333 12.0367 3.93379 12.4281 3.95858 12.7315C3.9828 13.0279 4.0272 13.1871 4.08592 13.3023C4.22014 13.5657 4.43431 13.7799 4.69774 13.9141C4.81297 13.9729 4.97219 14.0173 5.26859 14.0415C5.57199 14.0663 5.96337 14.0667 6.53333 14.0667H9.46666C10.0366 14.0667 10.428 14.0663 10.7314 14.0415C11.0278 14.0173 11.187 13.9729 11.3022 13.9141C11.5657 13.7799 11.7798 13.5657 11.9141 13.3023C11.9728 13.1871 12.0172 13.0279 12.0414 12.7315C12.0662 12.4281 12.0667 12.0367 12.0667 11.4667V4.60007H3.93333ZM10.0667 3.40007H5.93334C5.93344 3.05392 5.93472 2.82072 5.9495 2.63986C5.96463 2.45463 5.99087 2.37773 6.01326 2.33381C6.08356 2.19582 6.19575 2.08363 6.33373 2.01333C6.37766 1.99095 6.45456 1.96471 6.63979 1.94957C6.83203 1.93387 7.08339 1.9334 7.46666 1.9334H8.53333C8.9166 1.9334 9.16796 1.93387 9.3602 1.94957C9.54543 1.96471 9.62233 1.99095 9.66625 2.01333C9.80424 2.08363 9.91642 2.19582 9.98673 2.33381C10.0091 2.37773 10.0354 2.45463 10.0505 2.63986C10.0653 2.82072 10.0666 3.05392 10.0667 3.40007Z" fill="currentColor" />
            </g>
          </svg>
        );
      case 'favorite':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24">
            <g>
              <path fillRule="evenodd" clipRule="evenodd" d="M11.3975 1.86603C11.7786 1.68431 12.2214 1.68431 12.6025 1.86603C12.9281 2.02124 13.11 2.29196 13.2061 2.44885C13.3051 2.61057 13.4074 2.81788 13.5098 3.02548L15.6878 7.43793L20.5597 8.15003C20.7887 8.18346 21.0174 8.21685 21.2017 8.26117C21.3806 8.30418 21.6941 8.39381 21.9421 8.65556C22.2325 8.96203 22.369 9.38316 22.3137 9.8017C22.2665 10.1592 22.0652 10.4157 21.9457 10.5555C21.8224 10.6995 21.6568 10.8608 21.491 11.0222L17.9671 14.4545L18.7986 19.3026C18.8378 19.5308 18.8769 19.7587 18.8918 19.9478C18.9064 20.1312 18.9183 20.4572 18.7461 20.7742C18.5446 21.1452 18.1863 21.4055 17.7711 21.4825C17.4164 21.5482 17.11 21.4361 16.9401 21.3656C16.7649 21.2929 16.5603 21.1852 16.3554 21.0774L12 18.787L7.64464 21.0774C7.4397 21.1852 7.23506 21.2929 7.05988 21.3656C6.88995 21.4361 6.58358 21.5482 6.22891 21.4825C5.8137 21.4055 5.45541 21.1452 5.25385 20.7742C5.08169 20.4572 5.09363 20.1312 5.10815 19.9478C5.12312 19.7587 5.16225 19.5308 5.20143 19.3026L6.03293 14.4545L2.53258 11.0452C2.5247 11.0375 2.51682 11.0299 2.50894 11.0222C2.34315 10.8608 2.17757 10.6995 2.05434 10.5555C1.93475 10.4157 1.73346 10.1592 1.68626 9.8017C1.63098 9.38316 1.76753 8.96203 2.05788 8.65556C2.30586 8.39381 2.6194 8.30418 2.79825 8.26117C2.98256 8.21685 3.21125 8.18346 3.44023 8.15003C3.4511 8.14844 3.46198 8.14686 3.47286 8.14527L8.31216 7.43793L10.4756 3.05505C10.4805 3.0452 10.4853 3.03534 10.4902 3.02548C10.5926 2.81788 10.6949 2.61057 10.7939 2.44885C10.89 2.29196 11.0719 2.02124 11.3975 1.86603ZM12 4.03344L9.90299 8.28174C9.8989 8.29003 9.89436 8.29941 9.88935 8.30975C9.84084 8.40991 9.74883 8.59986 9.60351 8.75627C9.48024 8.88894 9.33241 8.99643 9.1682 9.0728C8.97461 9.16282 8.76554 9.19179 8.65531 9.20706C8.64393 9.20864 8.63361 9.21007 8.62446 9.21141L3.93357 9.89705L7.32653 13.2018C7.33316 13.2083 7.34069 13.2155 7.34899 13.2234C7.42941 13.3006 7.58192 13.447 7.68592 13.6337C7.77413 13.7922 7.83073 13.9662 7.85256 14.1463C7.87829 14.3585 7.84101 14.5666 7.82135 14.6763C7.81932 14.6876 7.81748 14.6979 7.81592 14.707L7.01536 19.3746L11.2087 17.1694C11.2169 17.1651 11.2261 17.1601 11.2363 17.1547C11.3345 17.1021 11.5208 17.0023 11.7306 16.9612C11.9085 16.9263 12.0915 16.9263 12.2694 16.9612C12.4792 17.0023 12.6655 17.1021 12.7637 17.1547C12.7739 17.1601 12.7831 17.1651 12.7913 17.1694L16.9846 19.3746L16.1841 14.707C16.1825 14.6979 16.1807 14.6876 16.1786 14.6763C16.159 14.5666 16.1217 14.3585 16.1474 14.1463C16.1693 13.9662 16.2259 13.7922 16.3141 13.6337C16.4181 13.4469 16.5706 13.3006 16.651 13.2234C16.6593 13.2155 16.6668 13.2083 16.6735 13.2018L20.0664 9.89705L15.3755 9.21141C15.3664 9.21007 15.3561 9.20864 15.3447 9.20707C15.2345 9.19179 15.0254 9.16282 14.8318 9.0728C14.6676 8.99643 14.5198 8.88894 14.3965 8.75627C14.2512 8.59986 14.1592 8.4099 14.1106 8.30975C14.1056 8.29941 14.1011 8.29003 14.097 8.28174L12 4.03344Z" fill="currentColor" />
            </g>
          </svg>
        );
      case 'edit':
        return (
          <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const [historyData, setHistoryData] = useState([
    { id: 1, title: 'AI Applications in Science...', preview: "Hello! How can I assist you today? I'm here to help...", meta: '2 minutes ago • www.google.com', current: true, favorite: false },
    { id: 2, title: 'Welcome back', preview: "I've generated the mind map for the LLM Training Process...", meta: '20 hours ago • www.google.com', current: false, favorite: false }
  ]);

  const panelActionsData = [
    { id: 'chatBtn', title: 'Chat', icon: 'chat', active: true },
    { id: 'newChatBtn', title: 'New Chat', icon: 'newChat' },
    { id: 'historyBtn', title: 'Chat History', icon: 'history' },
    { id: 'newPromptBtn', title: 'New Prompt', icon: 'prompt' },
    { id: 'collectionsBtn', title: 'Collections', icon: 'collections' }
  ];

  const promptPills: PromptPill[] = [
    { id: 'write', title: 'Write', desc: 'Help me write content', icon: 'write' },
    { id: 'translate', title: 'Translate', desc: 'Help me translate', icon: 'translate' },
    { id: 'calendar', title: 'Calendar', desc: 'Help with calendar', icon: 'calendar' },
    { id: 'all', title: 'All', desc: 'View all available prompts', icon: 'all' }
  ];

  const [allPromptsData, setAllPromptsData] = useState<PromptPill[]>([
    { id: 'write', title: 'Write', desc: 'Help with writing and editing', icon: 'write' },
    { id: 'translate', title: 'Translate', desc: 'Translate between languages', icon: 'translate' },
    { id: 'summarize', title: 'Summarize', desc: 'Create concise summaries', icon: 'summarize' },
    { id: 'analyze', title: 'Analyze', desc: 'Analyze data and content', icon: 'analyze' }
  ]);

  const collectionsData = {
    research: { 
      name: 'Research Papers', 
      icon: '📚', 
      count: 25, 
      updated: '1 week ago', 
      items: [
        { id: 'r1', title: 'Machine Learning Fundamentals', type: 'PDF' },
        { id: 'r2', title: 'Neural Networks Deep Dive', type: 'Article' },
        { id: 'r3', title: 'AI Ethics and Bias', type: 'Research' }
      ]
    },
    design: { 
      name: 'Design Resources', 
      icon: '🎨', 
      count: 87, 
      updated: '3 days ago', 
      items: [
        { id: 'd1', title: 'UI Design Principles', type: 'Guide' },
        { id: 'd2', title: 'Color Theory Basics', type: 'Tutorial' }
      ]
    },
    learning: { 
      name: 'Learning Materials', 
      icon: '📖', 
      count: 142, 
      updated: '6 hours ago', 
      items: [
        { id: 'l1', title: 'JavaScript Essentials', type: 'Course' },
        { id: 'l2', title: 'React Patterns', type: 'Book' }
      ]
    },
    projects: { 
      name: 'Project Ideas', 
      icon: '💡', 
      count: 33, 
      updated: '2 weeks ago', 
      items: [
        { id: 'p1', title: 'AI Chat Application', type: 'Idea' },
        { id: 'p2', title: 'E-commerce Platform', type: 'MVP' }
      ]
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    // Не закриваємо панель, якщо відкрита будь-яка модалка або chat history
    if (showContextModal || showCollectionsModal || showCreatePromptModal || showChatHistory) {
      return;
    }
    
    // Перевіряємо, чи клік не на панелі, не на header, і не на модалках
    if (
      panelRef.current && 
      !panelRef.current.contains(target as Node) && 
      !target.closest('header') &&
      !target.closest('#ai-context-modal-portal') &&
      !target.closest('#ai-collections-modal-portal') &&
      !target.closest('#ai-create-prompt-modal-portal')
    ) {
      // Закриваємо панель при кліку поза нею
      onClose();
    }
  }, [onClose, showContextModal, showCollectionsModal, showCreatePromptModal, showChatHistory]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      try {
        if (document) {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      } catch (error) {
        console.warn('Error removing event listener:', error);
      }
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (isOpen && chatInputRef.current) {
      setTimeout(() => chatInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Escape to close modals and panels
      if (e.key === 'Escape') {
        if (showContextModal) {
          setShowContextModal(false);
          setContextCollectionView(null);
          setSelectedContexts([]);
        } else if (showCollectionsModal) {
          setShowCollectionsModal(false);
          setCollectionsItemsView(null);
          setSelectedCollectionItems([]);
        } else if (showCreatePromptModal) {
          setShowCreatePromptModal(false);
          setPromptForm({ name: '', text: '', model: 'GPT-4o mini', access: 'Accessible to everyone' });
        } else if (isOpen) {
          onClose();
        } else if (showChatHistory) {
          setShowChatHistory(false);
        } else {
          setShowPromptsInline(false);
          setShowCollectionsInline(false);
          setShowAllPromptsInline(false);
        }
      }
      
      // Cmd/Ctrl + K to open AI panel
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // This would need to be handled by parent component
          // For now, we'll just focus the input if panel is already open
          if (isOpen && chatInputRef.current) {
            chatInputRef.current.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, onClose, showContextModal, showCollectionsModal, showCreatePromptModal, showChatHistory]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const submitMessage = () => {
    const message = chatInput.trim();
    if (!message) return;
    
    setMessages(prev => [...prev, { type: 'user', text: message }]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', text: 'I understand your request. Let me help you with that.' }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  const handlePromptPillClick = (pillId: string) => {
    if (pillId === 'all') {
      setShowAllPromptsInline(!showAllPromptsInline);
      return;
    }
    setActivePrompt(pillId);
    setShowAllPromptsInline(false);
  };

  const adjustTextareaHeight = useCallback(() => {
    if (chatInputRef.current) {
      chatInputRef.current.style.height = 'auto';
      chatInputRef.current.style.height = Math.min(chatInputRef.current.scrollHeight, 120) + 'px';
    }
  }, []);

  const handleChatInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setChatInput(value);
    
    if (value.startsWith('/')) {
      setShowPromptsInline(true);
      setShowCollectionsInline(false);
    } else if (value.includes('@')) {
      setShowCollectionsInline(true);
      setShowPromptsInline(false);
    } else {
      setShowPromptsInline(false);
      setShowCollectionsInline(false);
    }
    
    adjustTextareaHeight();
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [chatInput, adjustTextareaHeight]);

  const addContextPill = (name: string, type: string, id: string) => {
    setContextPills(prev => [...prev, { id, type, name }]);
  };

  const removeContext = (type: string, id: string) => {
    setContextPills(prev => prev.filter(pill => !(pill.type === type && pill.id === id)));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {typeof window !== 'undefined' && (
        <Portal containerId="ai-assistant-platform-desktop-portal">
          <div className="fixed inset-0 z-[1001] pointer-events-none">
            {/* Backdrop - invisible, only for click outside */}
            <div 
              className="fixed inset-0 cursor-pointer pointer-events-auto" 
              onClick={handleBackdropClick}
            />
            
            {/* AI Panel */}
            <div 
              ref={panelRef}
              className={cn(
                "fixed top-0 right-0 w-[450px] bg-white shadow-2xl flex pointer-events-auto",
                "transform transition-all duration-300 ease-in-out",
                "border-l border-gray-200",
                styles.aiPanel,
                isOpen ? "translate-x-0" : "translate-x-full",
                isExpanded && "w-[580px]",
                className
              )}
              style={{
                backgroundColor: 'white !important',
                boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                height: '100vh',
                minHeight: '100vh',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
        {/* Left Column */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden" style={{ height: '100%', maxHeight: '100%', minHeight: 0 }}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--bold-text)] font-inter">Assistant</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-[var(--surface-secondary)] hover:bg-[var(--gray-200)] border-none rounded-full flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:text-[var(--text-default)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.51025 3.51594C4.2386 3.23845 3.79343 3.23372 3.51594 3.50537C3.23845 3.77702 3.23372 4.22219 3.50537 4.49968L8.00075 9.09168L3.5155 13.4902C3.23825 13.7621 3.2339 14.2072 3.50579 14.4845C3.77769 14.7617 4.22286 14.7661 4.50012 14.4942L9 10.0814L13.4999 14.4942C13.7771 14.7661 14.2223 14.7617 14.4942 14.4845C14.7661 14.2072 14.7617 13.7621 14.4845 13.4902L9.99924 9.09168L14.4946 4.49968C14.7663 4.22219 14.7615 3.77702 14.4841 3.50537C14.2066 3.23372 13.7614 3.23845 13.4897 3.51594L9 8.10217L4.51025 3.51594Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>
            <div 
              ref={chatMessagesRef}
              className="flex-1 p-4 overflow-y-auto space-y-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col gap-2",
                    message.type === 'user' ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-inter",
                      message.type === 'user'
                        ? "bg-[var(--verification-blue)] text-white rounded-br-[4px]"
                        : "bg-[var(--gray-100)] text-[var(--text-default)] rounded-bl-[4px]"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Context Pills */}
            {contextPills.length > 0 && (
              <div className="px-4 py-3 flex gap-2 flex-wrap min-h-[40px]">
                {contextPills.map((pill) => (
                  <div
                    key={pill.id}
                    className="bg-[var(--gray-100)] border border-[var(--border-color)] rounded-2xl px-3 py-1.5 pr-4 text-xs text-[var(--text-default)] flex items-center gap-2 relative cursor-pointer group"
                  >
                    <span>{pill.name}</span>
                    <span className="ml-auto opacity-100 transition-opacity group-hover:opacity-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                    <button
                      onClick={() => removeContext(pill.type, pill.id)}
                      className="w-4 h-4 bg-transparent border-none text-[var(--subtle-text)] cursor-pointer p-0.5 rounded-full hidden group-hover:flex items-center justify-center transition-all hover:bg-black hover:bg-opacity-10 ml-auto"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 18 18">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.51025 3.51594C4.2386 3.23845 3.79343 3.23372 3.51594 3.50537C3.23845 3.77702 3.23372 4.22219 3.50537 4.49968L8.00075 9.09168L3.5155 13.4902C3.23825 13.7621 3.2339 14.2072 3.50579 14.4845C3.77769 14.7617 4.22286 14.7661 4.50012 14.4942L9 10.0814L13.4999 14.4942C13.7771 14.7661 14.2223 14.7617 14.4942 14.4845C14.7661 14.2072 14.7617 13.7621 14.4845 13.4902L9.99924 9.09168L14.4946 4.49968C14.7663 4.22219 14.7615 3.77702 14.4841 3.50537C14.2066 3.23372 13.7614 3.23845 13.4897 3.51594L9 8.10217L4.51025 3.51594Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Prompt Pills */}
            <div className="pl-4 py-3 border-b border-gray-200 relative">
              <div className="flex gap-2 flex-wrap">
                {promptPills.map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => handlePromptPillClick(pill.id)}
                    className={cn(
                      "bg-[var(--apply-button-bg)] border border-transparent rounded-2xl px-3 py-1.5 text-sm cursor-pointer transition-all text-[var(--text-default)] flex items-center gap-1 hover:bg-[var(--apply-button-hover)] hover:border-[var(--active-green)]",
                      activePrompt === pill.id && "bg-[var(--active-green)] text-white"
                    )}
                  >
                    <span className="flex items-center justify-center w-4 h-4">
                      {renderIcon(pill.icon, "w-4 h-4")}
                    </span>
                    {pill.title}
                  </button>
                ))}
              </div>
              
              {/* All Prompts Inline Modal */}
              {showAllPromptsInline && (
                <div className="absolute bottom-full left-4 right-4 mb-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg shadow-lg max-h-[400px] min-h-[300px] overflow-y-auto z-50">
                  {allPromptsData.map((prompt, index) => (
                    <div
                      key={prompt.id}
                      draggable
                      onDragStart={(e) => {
                        setDraggedPrompt(index);
                        e.dataTransfer.effectAllowed = 'move';
                      }}
                      onDragEnd={() => setDraggedPrompt(null)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (draggedPrompt !== null && draggedPrompt !== index) {
                          const newPrompts = [...allPromptsData];
                          const [removed] = newPrompts.splice(draggedPrompt, 1);
                          newPrompts.splice(index, 0, removed);
                          setAllPromptsData(newPrompts);
                          setDraggedPrompt(null);
                        }
                      }}
                      className={cn(
                        "px-4 py-3 flex items-center gap-3 cursor-grab hover:bg-[var(--surface-secondary)] border-b border-[var(--gray-100)] last:border-b-0 transition-all",
                        draggedPrompt === index && "opacity-50 cursor-grabbing"
                      )}
                    >
                      <div className="text-[var(--subtle-text)] cursor-grab">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="7.4" cy="3.5" r="1.8" />
                          <circle cx="14.6" cy="3.5" r="1.8" />
                          <circle cx="7.4" cy="11" r="1.8" />
                          <circle cx="14.6" cy="11" r="1.8" />
                          <circle cx="7.4" cy="18.3" r="1.8" />
                          <circle cx="14.6" cy="18.3" r="1.8" />
                        </svg>
                      </div>
                      <div className="w-8 h-8 bg-[var(--apply-button-bg)] rounded flex items-center justify-center text-[var(--active-green)] flex-shrink-0">
                        {renderIcon(prompt.icon, 'w-4 h-4')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[var(--text-default)]">{prompt.title}</div>
                        <div className="text-xs text-[var(--subtle-text)]">{prompt.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 relative">
              {/* Inline Modals */}
              {showPromptsInline && (
                <div className="absolute bottom-full left-4 right-4 mb-2 bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50">
                  {allPromptsData.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-[var(--surface-secondary)] border-b border-[var(--gray-100)] last:border-b-0"
                      onClick={() => {
                        setChatInput(`/${prompt.title.toLowerCase()} `);
                        setShowPromptsInline(false);
                        chatInputRef.current?.focus();
                      }}
                    >
                      <div className="w-6 h-6 bg-[var(--apply-button-bg)] rounded flex items-center justify-center text-[var(--active-green)] flex-shrink-0">
                        {renderIcon(prompt.icon, 'w-3.5 h-3.5')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[var(--text-default)]">{prompt.title}</div>
                        <div className="text-xs text-[var(--subtle-text)]">{prompt.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {showCollectionsInline && (
                <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-[var(--border-color)] rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50">
                  {Object.entries(collectionsData).map(([id, collection]) => (
                    <div
                      key={id}
                      className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#f8f9fa] border-b border-[#f5f5f5] last:border-b-0"
                      onClick={() => {
                        addContextPill(collection.name, 'collection', id);
                        setShowCollectionsInline(false);
                        setChatInput('');
                        chatInputRef.current?.focus();
                      }}
                    >
                      <div className="w-6 h-6 bg-[var(--apply-button-bg)] rounded flex items-center justify-center text-[var(--active-green)] text-xs flex-shrink-0">
                        {collection.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[var(--text-default)]">{collection.name}</div>
                        <div className="text-xs text-[var(--subtle-text)]">{collection.count} items • Updated {collection.updated}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="relative bg-[var(--surface-color)] border-[1.5px] border-[var(--border-color)] rounded-xl transition-all focus-within:border-[var(--verification-blue)] focus-within:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]">
                <div className="flex items-end gap-2 px-3 py-[18px] bg-[var(--surface-color)] rounded-xl">
                  <textarea
                    ref={chatInputRef}
                    value={chatInput}
                    onChange={handleChatInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything, type '/' for prompts, or '@' for collections"
                    className="flex-1 border-none outline-none resize-none text-sm leading-relaxed max-h-[120px] min-h-[20px] font-sans text-[var(--text-default)] placeholder-[var(--subtle-text)] bg-transparent"
                    rows={2}
                  />
                  <button
                    onClick={submitMessage}
                    className={cn(
                      "w-8 h-8 bg-[var(--verification-blue)] border-none rounded-full flex items-center justify-center cursor-pointer transition-all text-white",
                      chatInput.trim() ? "opacity-100 scale-100" : "opacity-0 scale-80"
                    )}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M14.006 3.162 4.157 6.703c-1.504.541-2.256.812-2.282 1.332-.025.52.697.864 2.14 1.55l3.991 1.897c.242.115.363.172.457.264.094.092.153.213.272.453l1.924 3.878c.698 1.408 1.047 2.112 1.564 2.082.516-.03.78-.771 1.307-2.252l3.477-9.753c.721-2.023 1.082-3.034.556-3.558-.525-.524-1.536-.16-3.557.566Z" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-[var(--surface-secondary)] border-t border-[var(--border-color)] px-3 py-2 rounded-b-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="bg-transparent border-none rounded-md px-2 py-1 pr-3 text-xs cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[rgba(29,119,189,0.1)] hover:text-[var(--verification-blue)] flex items-center gap-1.5">
                      <span>{activeModel}</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowContextModal(true)}
                      className="w-6 h-6 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[rgba(29,119,189,0.1)] hover:text-[var(--verification-blue)]"
                      title="Context"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                        <path d="M8 4L8 13.3333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M3.9872 2.19029C6.21466 2.6144 7.54224 3.50154 8.00016 4.01086C8.45809 3.50154 9.78566 2.6144 12.0131 2.19029C13.1416 1.97544 13.7058 1.86801 14.1863 2.27976C14.6668 2.69152 14.6668 3.36015 14.6668 4.69741V9.50331C14.6668 10.726 14.6668 11.3374 14.3584 11.7191C14.05 12.1008 13.3711 12.2301 12.0131 12.4886C10.8026 12.7191 9.85787 13.0864 9.17404 13.4554C8.50124 13.8185 8.16483 14 8.00016 14C7.8355 14 7.49908 13.8185 6.82628 13.4554C6.14246 13.0864 5.19772 12.7191 3.9872 12.4886C2.62926 12.2301 1.95029 12.1008 1.64189 11.7191C1.3335 11.3374 1.3335 10.726 1.3335 9.50331V4.69741C1.3335 3.36015 1.3335 2.69152 1.81402 2.27976C2.29454 1.86801 2.85876 1.97544 3.9872 2.19029Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => {
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.multiple = true;
                        fileInput.accept = '*/*';
                        
                        fileInput.addEventListener('change', function(e) {
                          const target = e.target as HTMLInputElement;
                          const files = Array.from(target.files || []);
                          if (files.length > 0) {
                            const fileNames = files.map(f => f.name).join(', ');
                            setMessages(prev => [...prev, { type: 'user', text: `Uploaded files: ${fileNames}` }]);
                            
                            setTimeout(() => {
                              setMessages(prev => [...prev, { type: 'ai', text: 'Files uploaded successfully. How can I help you with these files?' }]);
                            }, 1000);
                          }
                        });
                        
                        fileInput.click();
                      }}
                      className="w-6 h-6 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[rgba(29,119,189,0.1)] hover:text-[var(--verification-blue)]"
                      title="Upload File"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => {
                        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                          navigator.mediaDevices.getDisplayMedia({ video: true })
                            .then(stream => {
                              setMessages(prev => [...prev, { type: 'user', text: 'Screenshot captured successfully' }]);
                              stream.getTracks().forEach(track => track.stop());
                              
                              setTimeout(() => {
                                setMessages(prev => [...prev, { type: 'ai', text: 'I can see your screenshot. What would you like me to help you with?' }]);
                              }, 1000);
                            })
                            .catch(err => {
                              console.log('Screenshot cancelled or failed:', err);
                            });
                        } else {
                          alert('Screenshot functionality not supported in this browser');
                        }
                      }}
                      className="w-6 h-6 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[rgba(29,119,189,0.1)] hover:text-[var(--verification-blue)]"
                      title="Screenshot"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.0702 1.55594C13.3154 1.77884 13.3335 2.15831 13.1106 2.40351L9.77734 6.07017C9.55444 6.31537 9.17497 6.33344 8.92977 6.11054C8.68458 5.88764 8.6665 5.50817 8.8894 5.26297L12.2227 1.59631C12.4456 1.35111 12.825 1.33304 13.0702 1.55594ZM2.92786 1.55761C3.17213 1.3337 3.55167 1.3502 3.77559 1.59447L11.083 9.56621C11.3682 9.45872 11.6772 9.39991 12 9.39991C13.4359 9.39991 14.6 10.564 14.6 11.9999C14.6 13.4358 13.4359 14.5999 12 14.5999C10.564 14.5999 9.39996 13.4358 9.39996 11.9999C9.39996 11.3246 9.65738 10.7095 10.0794 10.2473L8.09707 8.08468L5.92721 10.2547C6.34528 10.7161 6.59996 11.3282 6.59996 11.9999C6.59996 13.4358 5.4359 14.5999 3.99996 14.5999C2.56402 14.5999 1.39996 13.4358 1.39996 11.9999C1.39996 10.564 2.56402 9.39991 3.99996 9.39991C4.3232 9.39991 4.63266 9.45889 4.91816 9.56668L7.28543 7.19926L2.891 2.40534C2.66709 2.16107 2.68359 1.78153 2.92786 1.55761ZM3.99996 10.5999C3.22676 10.5999 2.59996 11.2267 2.59996 11.9999C2.59996 12.7731 3.22676 13.3999 3.99996 13.3999C4.77316 13.3999 5.39996 12.7731 5.39996 11.9999C5.39996 11.2267 4.77316 10.5999 3.99996 10.5999ZM12 10.5999C11.2268 10.5999 10.6 11.2267 10.6 11.9999C10.6 12.7731 11.2268 13.3999 12 13.3999C12.7732 13.3999 13.4 12.7731 13.4 11.9999C13.4 11.2267 12.7732 10.5999 12 10.5999Z" clipRule="evenodd" fillRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[50px] bg-[var(--surface-secondary)] border-l border-[var(--border-color)] flex flex-col p-3 gap-2">
          {/* Panel Controls */}
          <div className="flex flex-col gap-1 mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-[34px] h-[34px] bg-transparent border-none rounded-md flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[var(--gray-200)] hover:text-[var(--text-default)]"
              title="Expand"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 10 10">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.32646 1.62943C8.2758 1.62529 8.2062 1.625 8.08333 1.625H5.41667C5.20956 1.625 5.04167 1.45711 5.04167 1.25C5.04167 1.04289 5.20956 0.875002 5.41667 0.875002L8.09573 0.875001C8.2017 0.87499 8.30255 0.87498 8.38754 0.881924C8.48021 0.889495 8.5865 0.907156 8.69274 0.961288C8.84171 1.03719 8.96282 1.1583 9.03872 1.30726C9.09285 1.4135 9.11051 1.5198 9.11808 1.61247C9.12502 1.69745 9.12501 1.7983 9.125 1.90427L9.125 4.58333C9.125 4.79044 8.95711 4.95833 8.75 4.95833C8.54289 4.95833 8.375 4.79044 8.375 4.58333V1.91667C8.375 1.7938 8.37471 1.72421 8.37057 1.67354C8.36926 1.65755 8.36781 1.64748 8.36682 1.64187C8.36437 1.63856 8.36144 1.63564 8.35814 1.63319C8.35252 1.6322 8.34246 1.63074 8.32646 1.62943ZM1.25 5.04167C1.45711 5.04167 1.625 5.20956 1.625 5.41667L1.625 8.08333C1.625 8.2062 1.62529 8.2758 1.62943 8.32646C1.63074 8.34246 1.6322 8.35252 1.63319 8.35813C1.63564 8.36144 1.63856 8.36437 1.64187 8.36682C1.64748 8.36781 1.65755 8.36926 1.67354 8.37057C1.72421 8.37471 1.7938 8.375 1.91667 8.375H4.58333C4.79044 8.375 4.95833 8.54289 4.95833 8.75C4.95833 8.95711 4.79044 9.125 4.58333 9.125L1.90427 9.125C1.7983 9.12501 1.69745 9.12502 1.61247 9.11808C1.5198 9.11051 1.4135 9.09285 1.30726 9.03872C1.1583 8.96281 1.03719 8.8417 0.961288 8.69274C0.907156 8.5865 0.889495 8.48021 0.881924 8.38754C0.87498 8.30255 0.87499 8.2017 0.875001 8.09573L0.875002 5.41667C0.875002 5.20956 1.0429 5.04167 1.25 5.04167Z" fill="currentColor"/>
              </svg>
            </button>
            <button
              onClick={onClose}
              className="w-[34px] h-[34px] bg-transparent border-none rounded-md flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[var(--gray-200)] hover:text-[var(--text-default)]"
              title="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.51025 3.51594C4.2386 3.23845 3.79343 3.23372 3.51594 3.50537C3.23845 3.77702 3.23372 4.22219 3.50537 4.49968L8.00075 9.09168L3.5155 13.4902C3.23825 13.7621 3.2339 14.2072 3.50579 14.4845C3.77769 14.7617 4.22286 14.7661 4.50012 14.4942L9 10.0814L13.4999 14.4942C13.7771 14.7661 14.2223 14.7617 14.4942 14.4845C14.7661 14.2072 14.7617 13.7621 14.4845 13.4902L9.99924 9.09168L14.4946 4.49968C14.7663 4.22219 14.7615 3.77702 14.4841 3.50537C14.2066 3.23372 13.7614 3.23845 13.4897 3.51594L9 8.10217L4.51025 3.51594Z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          {/* Panel Actions */}
          <div className="flex flex-col gap-3 flex-1">
            {panelActionsData.map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  setActivePanelAction(action.id);
                  if (action.id === 'historyBtn') {
                    setShowChatHistory(!showChatHistory);
                  } else if (action.id === 'newChatBtn') {
                    setMessages([{ type: 'ai', text: "Hello! How can I assist you today? I'm here to help with writing, research, analysis, and more." }]);
                    setShowChatHistory(false);
                  } else if (action.id === 'collectionsBtn') {
                    setShowCollectionsModal(true);
                    setShowChatHistory(false);
                  } else if (action.id === 'newPromptBtn') {
                    setShowCreatePromptModal(true);
                    setShowChatHistory(false);
                  } else {
                    setShowChatHistory(false);
                  }
                }}
                className={cn(
                  "w-[34px] h-[34px] bg-transparent border-none rounded-lg flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[var(--apply-button-bg)] hover:text-[var(--active-green)]",
                  activePanelAction === action.id && "bg-[var(--apply-button-bg)] text-[var(--active-green)]"
                )}
                title={action.title}
              >
                {action.icon === 'chat' && (
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.063 2.931A9.99 9.99 0 0 0 .123 8.444a9.883 9.883 0 0 0 1.195 6.49L.085 19.009a.729.729 0 0 0 .9.913l4.166-1.194a9.856 9.856 0 0 0 6.448 1.142 9.989 9.989 0 0 0 8.12-12.214 9.991 9.991 0 0 0-2.656-4.725Zm1.57 8.499a8.784 8.784 0 0 1-7.227 7.2 8.664 8.664 0 0 1-5.856-1.112l-.231-.139-3.762 1.078 1.118-3.691-.145-.238a8.655 8.655 0 0 1-1.172-5.893 8.751 8.751 0 1 1 17.275 2.8v-.005Z"></path>
                  </svg>
                )}
                {action.icon === 'newChat' && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M7.5 10H12.5"></path>
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 7.5V12.5"></path>
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M2.5 4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667Z"></path>
                  </svg>
                )}
                {action.icon === 'history' && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 2.625C5.03147 2.625 2.625 5.03147 2.625 8C2.625 10.9685 5.03147 13.375 8 13.375C10.9685 13.375 13.375 10.9685 13.375 8C13.375 5.03147 10.9685 2.625 8 2.625ZM1.375 8C1.375 4.34111 4.34111 1.375 8 1.375C11.6589 1.375 14.625 4.34111 14.625 8C14.625 11.6589 11.6589 14.625 8 14.625C4.34111 14.625 1.375 11.6589 1.375 8ZM8 3.775C8.34518 3.775 8.625 4.05482 8.625 4.4V7.61373L10.6795 8.64098C10.9882 8.79535 11.1134 9.17077 10.959 9.47951C10.8046 9.78825 10.4292 9.91339 10.1205 9.75902L7.72049 8.55902C7.50875 8.45315 7.375 8.23673 7.375 8V4.4C7.375 4.05482 7.65482 3.775 8 3.775Z" fill="currentColor"></path>
                  </svg>
                )}
                {action.icon === 'prompt' && (
                  <svg className="w-4 h-4" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <path d="M8 12a2 2 0 0 0 2-2V8H8"></path>
                    <path d="M14 12a2 2 0 0 0 2-2V8h-2"></path>
                  </svg>
                )}
                {action.icon === 'collections' && (
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path fill="currentColor" d="M3.938 3.25c0-.345.28-.625.624-.625h6.875c.346 0 .626.28.626.625v9.985a.125.125 0 0 1-.18.113l-3.278-1.605a1.375 1.375 0 0 0-1.21 0l-3.278 1.605a.125.125 0 0 1-.18-.113V3.25Zm.624-1.875c-1.035 0-1.875.84-1.875 1.875v9.985a1.375 1.375 0 0 0 1.98 1.235l3.278-1.604a.125.125 0 0 1 .11 0l3.278 1.604a1.375 1.375 0 0 0 1.98-1.235V3.25c0-1.036-.84-1.875-1.876-1.875H4.564Zm3.123 4.933.345-.84.353.845c.063.15.178.274.323.347l.903.46-.898.447a.687.687 0 0 0-.329.352l-.352.85-.344-.845a.688.688 0 0 0-.333-.358L6.45 7.12l.91-.458a.688.688 0 0 0 .326-.354Zm.974-2.247a.688.688 0 0 0-1.27.004L6.706 5.73l-1.548.78a.687.687 0 0 0 .006 1.23l1.542.761.682 1.679a.688.688 0 0 0 1.272.004l.699-1.683 1.53-.762a.687.687 0 0 0 .005-1.228l-1.535-.78-.7-1.67Z"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat History Panel */}
      <div className={cn(
        "fixed top-0 w-[450px] bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.1)] z-[1002] flex flex-col pointer-events-auto",
        "transition-all duration-300 ease-in-out",
        showChatHistory ? "right-0" : "right-[-450px]"
      )}
      style={{ 
        height: '100vh',
        minHeight: '100vh',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        {/* Chat History Header */}
        <div className="px-5 py-5 border-b border-[var(--border-color)] flex items-center justify-between flex-shrink-0" style={{ padding: '20px' }}>
          <h2 className="text-lg font-semibold text-[var(--bold-text)]" style={{ fontSize: '18px', fontWeight: 600, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Chat History</h2>
          <button
            onClick={() => setShowChatHistory(false)}
            className="bg-transparent border-none text-[var(--subtle-text)] cursor-pointer rounded transition-all hover:bg-[#f5f5f5] hover:text-[var(--text-default)] flex items-center justify-center"
            style={{ padding: '4px', fontSize: '20px', lineHeight: 1, width: '28px', height: '28px' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 18 18">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.51025 3.51594C4.2386 3.23845 3.79343 3.23372 3.51594 3.50537C3.23845 3.77702 3.23372 4.22219 3.50537 4.49968L8.00075 9.09168L3.5155 13.4902C3.23825 13.7621 3.2339 14.2072 3.50579 14.4845C3.77769 14.7617 4.22286 14.7661 4.50012 14.4942L9 10.0814L13.4999 14.4942C13.7771 14.7661 14.2223 14.7617 14.4942 14.4845C14.7661 14.2072 14.7617 13.7621 14.4845 13.4902L9.99924 9.09168L14.4946 4.49968C14.7663 4.22219 14.7615 3.77702 14.4841 3.50537C14.2066 3.23372 13.7614 3.23845 13.4897 3.51594L9 8.10217L4.51025 3.51594Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* History Search */}
        <div className="px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0" style={{ padding: '16px 20px' }}>
          <input
            type="text"
            placeholder="Search conversations..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            className="w-full px-3 py-2.5 border border-[var(--border-color)] rounded-md text-sm text-[var(--text-default)] bg-white focus:outline-none focus:border-[var(--verification-blue)] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]"
            style={{ 
              padding: '10px 12px',
              fontSize: '14px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          />
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto" style={{ padding: '16px 0' }}>
          {historyData
            .filter(item => 
              historySearch === '' || 
              item.title.toLowerCase().includes(historySearch.toLowerCase()) ||
              item.preview.toLowerCase().includes(historySearch.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.id}
                className={cn(
                  "px-5 py-3 cursor-pointer transition-all relative border-b border-[#f5f5f5] hover:bg-[#f8f9fa] group",
                  item.current && "bg-[var(--apply-button-bg)] border-l-[3px] border-l-[var(--active-green)]"
                )}
                style={{ padding: '12px 20px' }}
                onClick={() => {
                  // Set as current conversation
                  setHistoryData(prev => prev.map(h => ({ ...h, current: h.id === item.id })));
                  // Load conversation
                  setMessages([{ type: 'ai', text: `Loaded conversation: ${item.title}` }]);
                }}
              >
                <div className="flex items-center gap-2.5 mb-1" style={{ gap: '10px', marginBottom: '4px' }}>
                  <div className="text-sm font-medium text-[var(--text-default)] whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0" style={{ fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                    {item.title}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newTitle = prompt('Edit title:', item.title);
                      if (newTitle && newTitle !== item.title) {
                        setHistoryData(prev => prev.map(h => h.id === item.id ? { ...h, title: newTitle } : h));
                      }
                    }}
                    className="w-5 h-5 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] opacity-0 group-hover:opacity-100 hover:bg-[var(--arrow-circle)] hover:text-[var(--text-default)] flex-shrink-0"
                    style={{ width: '20px', height: '20px', borderRadius: '4px' }}
                    title="Edit"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="text-xs text-[var(--subtle-text)] leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis mb-1" style={{ fontSize: '12px', lineHeight: 1.3, marginBottom: '4px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  {item.preview}
                </div>
                <div className="flex items-center justify-between gap-2.5" style={{ gap: '10px' }}>
                  <div className="text-xs text-[var(--subtle-text)] whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0" style={{ fontSize: '11px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                    {item.meta}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" style={{ gap: '4px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('View files functionality would open here');
                      }}
                      className="w-5 h-5 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[var(--arrow-circle)] hover:text-[var(--text-default)]"
                      style={{ width: '20px', height: '20px', borderRadius: '4px' }}
                      title="View Files"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                        <g>
                          <path fillRule="evenodd" clipRule="evenodd" d="M3.09998 5.0001C3.09998 2.84619 4.84607 1.1001 6.99998 1.1001H17C19.1539 1.1001 20.9 2.84619 20.9 5.0001V8.0001C20.9 8.49715 20.497 8.9001 20 8.9001C19.5029 8.9001 19.1 8.49715 19.1 8.0001V5.0001C19.1 3.8403 18.1598 2.9001 17 2.9001H6.99998C5.84018 2.9001 4.89998 3.8403 4.89998 5.0001V19.0001C4.89998 20.1599 5.84018 21.1001 6.99998 21.1001H11C11.497 21.1001 11.9 21.503 11.9 22.0001C11.9 22.4972 11.497 22.9001 11 22.9001H6.99998C4.84606 22.9001 3.09998 21.154 3.09998 19.0001V5.0001ZM6.90002 7.53367C6.90002 7.03661 7.30297 6.63367 7.80002 6.63367H16.2684C16.7654 6.63367 17.1684 7.03661 17.1684 7.53367C17.1684 8.03072 16.7654 8.43367 16.2684 8.43367H7.80002C7.30297 8.43367 6.90002 8.03072 6.90002 7.53367ZM19.5 12.9001C19.1686 12.9001 18.9 13.1687 18.9 13.5001V19.0001C18.9 19.4972 18.497 19.9001 18 19.9001C17.5029 19.9001 17.1 19.4972 17.1 19.0001V13.5001C17.1 12.1746 18.1745 11.1001 19.5 11.1001C20.8255 11.1001 21.9 12.1746 21.9 13.5001V19.0001C21.9 21.154 20.1539 22.9001 18 22.9001C15.8461 22.9001 14.1 21.154 14.1 19.0001V15.0001C14.1 14.503 14.5029 14.1001 15 14.1001C15.497 14.1001 15.9 14.503 15.9 15.0001V19.0001C15.9 20.1599 16.8402 21.1001 18 21.1001C19.1598 21.1001 20.1 20.1599 20.1 19.0001V13.5001C20.1 13.1687 19.8313 12.9001 19.5 12.9001ZM6.90002 12.0325C6.90002 11.5354 7.30297 11.1325 7.80002 11.1325H12.2684C12.7654 11.1325 13.1684 11.5354 13.1684 12.0325C13.1684 12.5295 12.7654 12.9325 12.2684 12.9325H7.80002C7.30297 12.9325 6.90002 12.5295 6.90002 12.0325Z" fill="currentColor" />
                        </g>
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this conversation?')) {
                          setHistoryData(prev => prev.filter(h => h.id !== item.id));
                        }
                      }}
                      className="w-5 h-5 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all text-[var(--subtle-text)] hover:bg-[var(--arrow-circle)] hover:text-[var(--text-default)]"
                      style={{ width: '20px', height: '20px', borderRadius: '4px' }}
                      title="Delete"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16">
                        <g>
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.44306 0.733399H8.55693C8.91018 0.733389 9.21096 0.733381 9.45792 0.753558C9.71736 0.774755 9.96975 0.821177 10.211 0.94412C10.5748 1.12948 10.8706 1.42524 11.0559 1.78902C11.1789 2.03031 11.2253 2.2827 11.2465 2.54214C11.2659 2.779 11.2666 3.06538 11.2667 3.40007H14C14.3314 3.40007 14.6 3.6687 14.6 4.00007C14.6 4.33144 14.3314 4.60007 14 4.60007H13.2667V11.4919C13.2667 12.0306 13.2667 12.4711 13.2374 12.8292C13.2071 13.1998 13.1426 13.5345 12.9833 13.8471C12.734 14.3363 12.3363 14.7341 11.847 14.9833C11.5344 15.1426 11.1997 15.2072 10.8291 15.2375C10.4711 15.2667 10.0305 15.2667 9.4918 15.2667H6.50819C5.96949 15.2667 5.52892 15.2667 5.17087 15.2375C4.80026 15.2072 4.46554 15.1426 4.15295 14.9833C3.66373 14.7341 3.26598 14.3363 3.01671 13.8471C2.85744 13.5345 2.79285 13.1998 2.76257 12.8292C2.73331 12.4711 2.73332 12.0306 2.73333 11.4919L2.73333 4.60007H1.99999C1.66862 4.60007 1.39999 4.33144 1.39999 4.00007C1.39999 3.6687 1.66862 3.40007 1.99999 3.40007H4.73333C4.73335 3.06538 4.73413 2.779 4.75349 2.54214C4.77468 2.2827 4.82111 2.03031 4.94405 1.78902C5.1294 1.42524 5.42517 1.12948 5.78895 0.94412C6.03023 0.821177 6.28263 0.774755 6.54207 0.753558C6.78903 0.733381 7.08981 0.733389 7.44306 0.733399ZM3.93333 4.60007V11.4667C3.93333 12.0367 3.93379 12.4281 3.95858 12.7315C3.9828 13.0279 4.0272 13.1871 4.08592 13.3023C4.22014 13.5657 4.43431 13.7799 4.69774 13.9141C4.81297 13.9729 4.97219 14.0173 5.26859 14.0415C5.57199 14.0663 5.96337 14.0667 6.53333 14.0667H9.46666C10.0366 14.0667 10.428 14.0663 10.7314 14.0415C11.0278 14.0173 11.187 13.9729 11.3022 13.9141C11.5657 13.7799 11.7798 13.5657 11.9141 13.3023C11.9728 13.1871 12.0172 13.0279 12.0414 12.7315C12.0662 12.4281 12.0667 12.0367 12.0667 11.4667V4.60007H3.93333ZM10.0667 3.40007H5.93334C5.93344 3.05392 5.93472 2.82072 5.9495 2.63986C5.96463 2.45463 5.99087 2.37773 6.01326 2.33381C6.08356 2.19582 6.19575 2.08363 6.33373 2.01333C6.37766 1.99095 6.45456 1.96471 6.63979 1.94957C6.83203 1.93387 7.08339 1.9334 7.46666 1.9334H8.53333C8.9166 1.9334 9.16796 1.93387 9.3602 1.94957C9.54543 1.96471 9.62233 1.99095 9.66625 2.01333C9.80424 2.08363 9.91642 2.19582 9.98673 2.33381C10.0091 2.37773 10.0354 2.45463 10.0505 2.63986C10.0653 2.82072 10.0666 3.05392 10.0667 3.40007Z" fill="currentColor" />
                        </g>
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHistoryData(prev => prev.map(h => 
                          h.id === item.id ? { ...h, favorite: !h.favorite } : h
                        ));
                      }}
                      className="w-5 h-5 bg-transparent border-none rounded flex items-center justify-center cursor-pointer transition-all hover:bg-[var(--arrow-circle)] hover:text-[var(--text-default)]"
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '4px',
                        color: item.favorite ? 'gold' : 'var(--subtle-text)'
                      }}
                      title="Favorite"
                    >
                      {renderIcon('favorite', 'w-3.5 h-3.5')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Context Modal */}
      {showContextModal && (
        <Portal containerId="ai-context-modal-portal">
          <div 
            className="fixed inset-0 flex items-center justify-center z-[1500] pointer-events-auto"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowContextModal(false);
                setContextCollectionView(null);
                setSelectedContexts([]);
              }
            }}
          >
            <div 
              className="bg-[var(--surface-color)] rounded-xl w-full max-w-[400px] max-h-[80vh] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.15)] pointer-events-auto"
              style={{
                animation: 'modalSlideIn 0.3s ease-out'
              }}
              onClick={(e) => e.stopPropagation()}
            >
            <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)] relative flex-shrink-0" style={{ padding: '20px 20px 16px 20px' }}>
              <h2 className="text-[var(--bold-text)]" style={{ fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Context</h2>
              <button
                onClick={() => setShowContextModal(false)}
                className="absolute bg-transparent border-none text-[var(--subtle-text)] cursor-pointer rounded transition-all hover:bg-[#f5f5f5] hover:text-[var(--text-default)] flex items-center justify-center"
                style={{ top: '16px', right: '16px', padding: '4px', width: '28px', height: '28px' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 18 18" style={{ fontSize: '20px', lineHeight: 1 }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.51025 3.51594C4.2386 3.23845 3.79343 3.23372 3.51594 3.50537C3.23845 3.77702 3.23372 4.22219 3.50537 4.49968L8.00075 9.09168L3.5155 13.4902C3.23825 13.7621 3.2339 14.2072 3.50579 14.4845C3.77769 14.7617 4.22286 14.7661 4.50012 14.4942L9 10.0814L13.4999 14.4942C13.7771 14.7661 14.2223 14.7617 14.4942 14.4845C14.7661 14.2072 14.7617 13.7621 14.4845 13.4902L9.99924 9.09168L14.4946 4.49968C14.7663 4.22219 14.7615 3.77702 14.4841 3.50537C14.2066 3.23372 13.7614 3.23845 13.4897 3.51594L9 8.10217L4.51025 3.51594Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto" style={{ padding: '20px' }}>
              <div className="flex border-b border-[var(--border-color)] mb-4">
                <button
                  onClick={() => setContextTab('tabs')}
                  className={cn(
                    "flex-1 bg-transparent border-none font-medium cursor-pointer transition-all text-[var(--subtle-text)] border-b-2 border-transparent",
                    contextTab === 'tabs' && "text-[var(--verification-blue)] border-b-[var(--verification-blue)]"
                  )}
                  style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                >
                  Tabs
                </button>
                <button
                  onClick={() => setContextTab('collections')}
                  className={cn(
                    "flex-1 bg-transparent border-none font-medium cursor-pointer transition-all text-[var(--subtle-text)] border-b-2 border-transparent",
                    contextTab === 'collections' && "text-[var(--verification-blue)] border-b-[var(--verification-blue)]"
                  )}
                  style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                >
                  Collections
                </button>
              </div>
              
              {contextTab === 'tabs' && (
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'monica', title: 'Chat - Monica', url: 'monica.im', icon: '🤖', current: true },
                    { id: 'google', title: 'Google', url: 'https://www.google.com/', icon: 'G', current: false },
                    { id: 'llm-training', title: 'LLM Training: A Step-by-Step Guide', url: 'https://example.com/llm-training', icon: '📚', current: false }
                  ].map((tab) => (
                    <div
                      key={tab.id}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 border border-[var(--border-color)] rounded-lg cursor-pointer transition-all",
                        tab.current && "border-l-[3px] border-l-[var(--verification-blue)] bg-[#f8f9ff]",
                        selectedContexts.includes(tab.id) && "bg-[var(--apply-button-bg)] border-[var(--active-green)]"
                      )}
                      onClick={() => {
                        if (selectedContexts.includes(tab.id)) {
                          setSelectedContexts(prev => prev.filter(id => id !== tab.id));
                        } else {
                          setSelectedContexts(prev => [...prev, tab.id]);
                        }
                      }}
                    >
                      <div className={cn(
                        "w-4 h-4 border-2 border-[var(--border-color)] flex items-center justify-center transition-all flex-shrink-0",
                        selectedContexts.includes(tab.id) && "bg-[var(--verification-blue)] border-[var(--verification-blue)]"
                      )}
                      style={{ borderRadius: '3px' }}>
                        {selectedContexts.includes(tab.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" style={{ display: 'flex' }}>
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="bg-[#f5f5f5] rounded flex items-center justify-center flex-shrink-0" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                        {tab.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[var(--text-default)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{tab.title}</div>
                        <div className="text-[var(--subtle-text)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '11px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{tab.url}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {contextTab === 'collections' && !contextCollectionView && (
                <div className="flex flex-col gap-2">
                  {Object.entries(collectionsData).map(([id, collection]) => (
                    <div
                      key={id}
                      className="flex items-center gap-3 px-3 py-3 border border-[var(--border-color)] rounded-lg cursor-pointer transition-all hover:bg-[#f8f9fa] hover:border-[var(--verification-blue)]"
                      onClick={() => setContextCollectionView(id)}
                    >
                      <div className="bg-[var(--apply-button-bg)] rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', fontSize: '16px' }}>
                        {collection.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[var(--text-default)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{collection.name}</div>
                        <div className="text-[var(--subtle-text)] flex items-center gap-1.5" style={{ fontSize: '11px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                          <span>{collection.count} items</span>
                          <span className="bg-[var(--subtle-text)] rounded-full" style={{ width: '3px', height: '3px' }} />
                          <span>Updated {collection.updated}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {contextTab === 'collections' && contextCollectionView && (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <button
                      onClick={() => setContextCollectionView(null)}
                      className="rounded-md font-medium cursor-pointer transition-all bg-transparent text-[var(--text-default)] border border-[var(--border-color)] hover:bg-[var(--apply-button-bg)] hover:border-[var(--active-green)]"
                      style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                    >
                      ← Back to Collections
                    </button>
                  </div>
                  <h4 className="text-[var(--bold-text)] mb-3" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                    {collectionsData[contextCollectionView as keyof typeof collectionsData]?.name}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {collectionsData[contextCollectionView as keyof typeof collectionsData]?.items.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 border border-[var(--border-color)] rounded-lg cursor-pointer transition-all",
                          selectedContexts.includes(`collection-item-${item.id}`) && "bg-[var(--apply-button-bg)] border-[var(--active-green)]",
                          "hover:bg-[#f8f9fa] hover:border-[var(--verification-blue)]"
                        )}
                        onClick={() => {
                          const itemContextId = `collection-item-${item.id}`;
                          if (selectedContexts.includes(itemContextId)) {
                            setSelectedContexts(prev => prev.filter(ctxId => ctxId !== itemContextId));
                          } else {
                            setSelectedContexts(prev => [...prev, itemContextId]);
                          }
                        }}
                      >
                        <div className={cn(
                          "w-4 h-4 border-2 border-[var(--border-color)] flex items-center justify-center transition-all flex-shrink-0",
                          selectedContexts.includes(`collection-item-${item.id}`) && "bg-[var(--verification-blue)] border-[var(--verification-blue)]"
                        )}
                        style={{ borderRadius: '3px' }}>
                          {selectedContexts.includes(`collection-item-${item.id}`) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" style={{ display: 'flex' }}>
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="bg-[#f5f5f5] rounded flex items-center justify-center flex-shrink-0" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                          {item.type === 'PDF' ? '📄' : item.type === 'Article' ? '📝' : item.type === 'Research' ? '🔬' : item.type === 'Guide' ? '📖' : item.type === 'Tutorial' ? '💡' : item.type === 'Course' ? '🎓' : item.type === 'Book' ? '📚' : item.type === 'Idea' ? '💭' : item.type === 'MVP' ? '🚀' : '📄'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[var(--text-default)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{item.title}</div>
                          <div className="text-[var(--subtle-text)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '11px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{item.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-[var(--border-color)] flex gap-3 justify-end flex-shrink-0" style={{ padding: '16px 20px 20px 20px' }}>
              <button
                onClick={() => {
                  setShowContextModal(false);
                  setContextCollectionView(null);
                  setSelectedContexts([]);
                }}
                className="rounded-md font-medium cursor-pointer transition-all bg-transparent text-[var(--text-default)] border border-[var(--border-color)] hover:bg-[var(--apply-button-bg)] hover:border-[var(--active-green)]"
                style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Apply selected contexts
                  selectedContexts.forEach(id => {
                    const tab = [
                      { id: 'monica', title: 'Chat - Monica', url: 'monica.im', icon: '🤖' },
                      { id: 'google', title: 'Google', url: 'https://www.google.com/', icon: 'G' },
                      { id: 'llm-training', title: 'LLM Training: A Step-by-Step Guide', url: 'https://example.com/llm-training', icon: '📚' }
                    ].find(t => t.id === id);
                    
                    if (tab) {
                      addContextPill(tab.title, 'tab', tab.id);
                    } else if (id.startsWith('collection-item-')) {
                      const itemId = id.replace('collection-item-', '');
                      const allItems = Object.values(collectionsData).flatMap(c => c.items);
                      const item = allItems.find(i => i.id === itemId);
                      if (item) {
                        addContextPill(item.title, 'collection-item', itemId);
                      }
                    } else {
                      const collection = collectionsData[id as keyof typeof collectionsData];
                      if (collection) {
                        addContextPill(collection.name, 'collection', id);
                      }
                    }
                  });
                  setShowContextModal(false);
                  setSelectedContexts([]);
                  setContextCollectionView(null);
                }}
                className="rounded-md font-medium cursor-pointer transition-all bg-[var(--verification-blue)] text-white hover:bg-[#1565c0]"
                style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                Apply
              </button>
            </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Collections Modal */}
      {showCollectionsModal && (
        <Portal containerId="ai-collections-modal-portal">
          <div 
            className="fixed inset-0 flex items-center justify-center z-[1500] pointer-events-auto"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCollectionsModal(false);
                setCollectionsItemsView(null);
                setSelectedCollectionItems([]);
              }
            }}
          >
            <div 
              className="bg-white rounded-xl w-full max-w-[400px] max-h-[80vh] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.15)] pointer-events-auto"
              style={{
                animation: 'modalSlideIn 0.3s ease-out',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
              onClick={(e) => e.stopPropagation()}
            >
            <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)] relative flex-shrink-0" style={{ padding: '20px 20px 16px 20px' }}>
              <button
                onClick={() => {
                  setCollectionsItemsView(null);
                  setSelectedCollectionItems([]);
                }}
                className={cn(
                  "absolute bg-transparent border-none text-[var(--subtle-text)] cursor-pointer rounded transition-all hover:bg-[#f5f5f5] hover:text-[var(--text-default)] flex items-center justify-center",
                  !collectionsItemsView && "hidden"
                )}
                style={{ top: '16px', left: '16px', padding: '4px', width: '28px', height: '28px', fontSize: '20px', lineHeight: 1 }}
              >
                ←
              </button>
              <h2 className={cn("text-[var(--bold-text)]", collectionsItemsView && "ml-[40px]")} style={{ fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                {collectionsItemsView ? collectionsData[collectionsItemsView as keyof typeof collectionsData]?.name + ' Items' : 'Collections'}
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCollectionsModal(false);
                  setCollectionsItemsView(null);
                  setSelectedCollectionItems([]);
                }}
                className="absolute bg-transparent border-none text-[var(--subtle-text)] cursor-pointer rounded transition-all hover:bg-[#f5f5f5] hover:text-[var(--text-default)] flex items-center justify-center"
                style={{ top: '16px', right: '16px', padding: '4px', width: '28px', height: '28px' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 18 18" style={{ fontSize: '20px', lineHeight: 1 }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.51025 3.51594C4.2386 3.23845 3.79343 3.23372 3.51594 3.50537C3.23845 3.77702 3.23372 4.22219 3.50537 4.49968L8.00075 9.09168L3.5155 13.4902C3.23825 13.7621 3.2339 14.2072 3.50579 14.4845C3.77769 14.7617 4.22286 14.7661 4.50012 14.4942L9 10.0814L13.4999 14.4942C13.7771 14.7661 14.2223 14.7617 14.4942 14.4845C14.7661 14.2072 14.7617 13.7621 14.4845 13.4902L9.99924 9.09168L14.4946 4.49968C14.7663 4.22219 14.7615 3.77702 14.4841 3.50537C14.2066 3.23372 13.7614 3.23845 13.4897 3.51594L9 8.10217L4.51025 3.51594Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto" style={{ padding: '20px' }}>
              {!collectionsItemsView ? (
                <div className="flex flex-col gap-2">
                  {Object.entries(collectionsData).map(([id, collection]) => (
                    <div
                      key={id}
                      className="flex items-center gap-3 px-3 py-3 border border-[var(--border-color)] rounded-lg cursor-pointer transition-all hover:bg-[#f8f9fa] hover:border-[var(--verification-blue)]"
                      onClick={() => setCollectionsItemsView(id)}
                    >
                      <div className="bg-[var(--apply-button-bg)] rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', fontSize: '16px' }}>
                        {collection.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[var(--text-default)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{collection.name}</div>
                        <div className="text-[var(--subtle-text)] flex items-center gap-1.5" style={{ fontSize: '11px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                          <span>{collection.count} items</span>
                          <span className="bg-[var(--subtle-text)] rounded-full" style={{ width: '3px', height: '3px' }} />
                          <span>Updated {collection.updated}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {collectionsData[collectionsItemsView as keyof typeof collectionsData]?.items.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 border border-[var(--border-color)] rounded-lg cursor-pointer transition-all",
                        selectedCollectionItems.includes(item.id) && "bg-[var(--apply-button-bg)] border-[var(--active-green)]",
                        "hover:bg-[#f8f9fa] hover:border-[var(--verification-blue)]"
                      )}
                      onClick={() => {
                        if (selectedCollectionItems.includes(item.id)) {
                          setSelectedCollectionItems(prev => prev.filter(id => id !== item.id));
                        } else {
                          setSelectedCollectionItems(prev => [...prev, item.id]);
                        }
                      }}
                    >
                      <div className={cn(
                        "w-4 h-4 border-2 border-[var(--border-color)] flex items-center justify-center transition-all flex-shrink-0",
                        selectedCollectionItems.includes(item.id) && "bg-[var(--verification-blue)] border-[var(--verification-blue)]"
                      )}
                      style={{ borderRadius: '3px' }}>
                        {selectedCollectionItems.includes(item.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" style={{ display: 'flex' }}>
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="bg-[#f5f5f5] rounded flex items-center justify-center flex-shrink-0" style={{ width: '24px', height: '24px', fontSize: '12px' }}>
                        {item.type === 'PDF' ? '📄' : item.type === 'Article' ? '📝' : item.type === 'Research' ? '🔬' : item.type === 'Guide' ? '📖' : item.type === 'Tutorial' ? '💡' : item.type === 'Course' ? '🎓' : item.type === 'Book' ? '📚' : item.type === 'Idea' ? '💭' : item.type === 'MVP' ? '🚀' : '📄'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[var(--text-default)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{item.title}</div>
                        <div className="text-[var(--subtle-text)] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: '11px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>{item.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {collectionsItemsView && (
              <div className="border-t border-[var(--border-color)] flex gap-3 justify-end flex-shrink-0" style={{ padding: '16px 20px 20px 20px' }}>
                <button
                  onClick={() => {
                    setCollectionsItemsView(null);
                    setSelectedCollectionItems([]);
                  }}
                  className="rounded-md font-medium cursor-pointer transition-all bg-transparent text-[var(--text-default)] border border-[var(--border-color)] hover:bg-[var(--apply-button-bg)] hover:border-[var(--active-green)]"
                  style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const collection = collectionsData[collectionsItemsView as keyof typeof collectionsData];
                    if (collection && selectedCollectionItems.length > 0) {
                      selectedCollectionItems.forEach(itemId => {
                        const item = collection.items.find(i => i.id === itemId);
                        if (item) {
                          addContextPill(item.title, 'collection-item', itemId);
                        }
                      });
                    } else if (collection) {
                      addContextPill(collection.name, 'collection', collectionsItemsView);
                    }
                    setShowCollectionsModal(false);
                    setCollectionsItemsView(null);
                    setSelectedCollectionItems([]);
                  }}
                  className="rounded-md font-medium cursor-pointer transition-all bg-[var(--verification-blue)] text-white hover:bg-[#1565c0]"
                  style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                >
                  Apply
                </button>
              </div>
            )}
            </div>
          </div>
        </Portal>
      )}

      {/* Create Prompt Modal */}
      {showCreatePromptModal && (
        <Portal containerId="ai-create-prompt-modal-portal">
          <div 
            className="fixed inset-0 flex items-center justify-center z-[1500] pointer-events-auto"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCreatePromptModal(false);
                setPromptForm({ name: '', text: '', model: 'GPT-4o mini', access: 'Accessible to everyone' });
              }
            }}
          >
            <div 
              className="bg-white rounded-xl w-full max-w-[400px] max-h-[80vh] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.15)] pointer-events-auto"
              style={{
                animation: 'modalSlideIn 0.3s ease-out',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
              onClick={(e) => e.stopPropagation()}
            >
            <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)] relative flex-shrink-0" style={{ padding: '20px 20px 16px 20px' }}>
              <h2 className="text-[var(--bold-text)]" style={{ fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Create Prompt</h2>
              <button
                onClick={() => {
                  setShowCreatePromptModal(false);
                  setPromptForm({ name: '', text: '', model: 'GPT-4o mini', access: 'Accessible to everyone' });
                }}
                className="absolute bg-transparent border-none text-[var(--subtle-text)] cursor-pointer rounded transition-all hover:bg-[#f5f5f5] hover:text-[var(--text-default)] flex items-center justify-center"
                style={{ top: '16px', right: '16px', padding: '4px', width: '28px', height: '28px' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 18 18" style={{ fontSize: '20px', lineHeight: 1 }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.51025 3.51594C4.2386 3.23845 3.79343 3.23372 3.51594 3.50537C3.23845 3.77702 3.23372 4.22219 3.50537 4.49968L8.00075 9.09168L3.5155 13.4902C3.23825 13.7621 3.2339 14.2072 3.50579 14.4845C3.77769 14.7617 4.22286 14.7661 4.50012 14.4942L9 10.0814L13.4999 14.4942C13.7771 14.7661 14.2223 14.7617 14.4942 14.4845C14.7661 14.2072 14.7617 13.7621 14.4845 13.4902L9.99924 9.09168L14.4946 4.49968C14.7663 4.22219 14.7615 3.77702 14.4841 3.50537C14.2066 3.23372 13.7614 3.23845 13.4897 3.51594L9 8.10217L4.51025 3.51594Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label className="block text-[var(--text-default)] mb-2" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Name</label>
                <input
                  type="text"
                  value={promptForm.name}
                  onChange={(e) => setPromptForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter the name"
                  className="w-full rounded-md border border-[var(--border-color)] text-[var(--text-default)] bg-white transition-all focus:outline-none focus:border-[var(--verification-blue)] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]"
                  style={{ padding: '12px', fontSize: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                />
                <div className="text-[var(--subtle-text)] mt-1" style={{ fontSize: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                  Example: Master translator, Writing expert, Code assistant
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label className="block text-[var(--text-default)] mb-2" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Prompt</label>
                <textarea
                  value={promptForm.text}
                  onChange={(e) => setPromptForm(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Example: You are an experienced translator with skills in multiple languages around the world. You are good at translating business scenario cases, making the translation results more formal and professional."
                  className="w-full rounded-md border border-[var(--border-color)] text-[var(--text-default)] bg-white transition-all focus:outline-none focus:border-[var(--verification-blue)] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)] resize-y"
                  style={{ padding: '12px', fontSize: '14px', minHeight: '100px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                  rows={5}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label className="block text-[var(--text-default)] mb-2" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Model</label>
                <select
                  value={promptForm.model}
                  onChange={(e) => setPromptForm(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full rounded-md border border-[var(--border-color)] text-[var(--text-default)] bg-white transition-all focus:outline-none focus:border-[var(--verification-blue)] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]"
                  style={{ padding: '12px', fontSize: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                >
                  <option>GPT-4o mini</option>
                  <option>GPT-4o</option>
                  <option>Claude Sonnet</option>
                  <option>Claude Opus</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label className="block text-[var(--text-default)] mb-2" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Accessibility</label>
                <select
                  value={promptForm.access}
                  onChange={(e) => setPromptForm(prev => ({ ...prev, access: e.target.value }))}
                  className="w-full rounded-md border border-[var(--border-color)] text-[var(--text-default)] bg-white transition-all focus:outline-none focus:border-[var(--verification-blue)] focus:shadow-[0_0_0_3px_rgba(29,119,189,0.1)]"
                  style={{ padding: '12px', fontSize: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                >
                  <option>Accessible to everyone</option>
                  <option>Private</option>
                  <option>Team only</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-[var(--border-color)] flex gap-3 justify-end flex-shrink-0" style={{ padding: '16px 20px 20px 20px' }}>
              <button
                onClick={() => {
                  setShowCreatePromptModal(false);
                  setPromptForm({ name: '', text: '', model: 'GPT-4o mini', access: 'Accessible to everyone' });
                }}
                className="rounded-md font-medium cursor-pointer transition-all bg-transparent text-[var(--text-default)] border border-[var(--border-color)] hover:bg-[var(--apply-button-bg)] hover:border-[var(--active-green)]"
                style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!promptForm.name || !promptForm.text) {
                    alert('Please fill in all required fields');
                    return;
                  }
                  
                  const newPrompt = {
                    id: promptForm.name.toLowerCase().replace(/\s+/g, '-'),
                    title: promptForm.name,
                    desc: promptForm.text.substring(0, 50) + '...',
                    icon: 'write'
                  };
                  
                  setAllPromptsData(prev => [...prev, newPrompt]);
                  setShowCreatePromptModal(false);
                  setPromptForm({ name: '', text: '', model: 'GPT-4o mini', access: 'Accessible to everyone' });
                  alert('Prompt created successfully!');
                }}
                className="rounded-md font-medium cursor-pointer transition-all bg-[var(--verification-blue)] text-white hover:bg-[#1565c0]"
                style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 500, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                Create Now
              </button>
            </div>
            </div>
          </div>
        </Portal>
      )}
        </div>
        </Portal>
      )}
    </>
  );
};
