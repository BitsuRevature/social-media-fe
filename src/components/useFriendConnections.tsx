// import { useState, useEffect } from "react";
// import { getFriends, getFriendRequests, sendFriendRequest, acceptFriendRequest, declineFriendRequest, unfriend } from "../util/apiHelper";
// import { UserType, FriendRequestType } from "../util/types";

// export function useFriendConnections() {
//     const [friends, setFriends] = useState<UserType[]>([]);
//     const [friendRequests, setFriendRequests] = useState<FriendRequestType[]>([]);

//     // Fetch friends and friend requests
//     useEffect(() => {
//         const fetchConnections = async () => {
//             try {
//                 const friendsList = await getFriends();
//                 const requestsList = await getFriendRequests();
//                 setFriends(friendsList);
//                 setFriendRequests(requestsList);
//             } catch (error) {
//                 console.error("Error fetching friends or requests:", error);
//             }
//         };

//         fetchConnections();
//     }, []); // Runs only once on mount

//     // Handle sending a friend request
//     const handleSendFriendRequest = async (userId: number) => {
//         // Prevent sending request if already friends
//         if (friends.some(friend => friend.id === userId)) {
//             alert("You are already friends!");
//             return;
//         }
    
//         try {
//             await sendFriendRequest(userId);
//             // Add a friend request with required fields
//             setFriendRequests(prev => [
//                 ...prev,
//                 { requestId: Date.now(), id: userId, profilePicture: "", username: "", status: "PENDING" }
//             ]);
//         } catch (error) {
//             console.error("Error sending friend request:", error);
//         }
//     };

//     // Handle accepting a friend request
//     const handleAcceptRequest = async (requestId: number, username: string) => {
//         try {
//             await acceptFriendRequest(requestId);
//             setFriendRequests(prev => prev.filter(req => req.requestId !== requestId));
//             setFriends(prev => [
//                 ...prev,
//                 { id: requestId, username, bio: "", profilePicture: "" }
//             ]);
//             // Re-fetch the requests list to make sure it's updated
//             const updatedRequests = await getFriendRequests();
//             setFriendRequests(updatedRequests);
//         } catch (error) {
//             console.error("Error accepting friend request:", error);
//         }
//     };
    
//     const handleDeclineRequest = async (requestId: number) => {
//         try {
//             await declineFriendRequest(requestId);
//             setFriendRequests(prev => prev.filter(req => req.requestId !== requestId));
//             // Re-fetch the requests list to make sure it's updated
//             const updatedRequests = await getFriendRequests();
//             setFriendRequests(updatedRequests);
//         } catch (error) {
//             console.error("Error declining friend request:", error);
//         }
//     };

//     // Handle unfriending a user
//     const handleUnfriend = async (connectionId: number) => {
//         try {
//             await unfriend(connectionId);
//             setFriends(prev => prev.filter(friend => friend.id !== connectionId));
//         } catch (error) {
//             console.error("Error unfriending user:", error);
//         }
//     };

//     return {
//         friends,
//         friendRequests,
//         handleSendFriendRequest,
//         handleAcceptRequest,
//         handleDeclineRequest,
//         handleUnfriend,
//     };
// }