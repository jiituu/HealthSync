// 'use client';

// import ChatArea from '@/components/common-components/chatFiles/ChatArea';
// import Sidebar from '@/components/common-components/chatFiles/Sidebar';
// // import ChatLayout from '@/components/common-components/chatFiles2/chat-layout';
// import ChatWithAI from '@/components/common-components/ChatWithAI';
// import React, { useState } from 'react';

// const ChatPatient = () => {
//   const [index, setIndex] = useState(0);

//   return (
//     <div>
//       <div className="flex items-center justify-center gap-6 border-b-2 relative">
//         <button
//           onClick={() => setIndex(0)}
//           className={`pb-2 text-lg font-medium w-full ${
//             index === 0 ? 'text-secondaryColor border-b-4 border-primaryColor' : 'text-gray-500'
//           }`}
//         >
//           Chat with Patients
//         </button>
//         <button
//           onClick={() => setIndex(1)}
//           className={`pb-2 text-lg font-medium w-full ${
//             index === 1 ? 'text-secondaryColor border-b-4 border-primaryColor' : 'text-gray-500'
//           }`}
//         >
//           Chat with AI
//         </button>
//       </div>

//       <div className="mt-4">
//         {index === 0 && (<div className="flex h-[80vh] bg-gray-100 ">
//                           <Sidebar isDoctor={false} />
//                           <ChatArea isDoctor={false} />
//                           {/* <ChatLayout/> */}
//                         </div>)}
//         {index === 1 && <ChatWithAI isDoctor={false} />}
//       </div>
//     </div>
//   );
// };

// export default ChatPatient;
