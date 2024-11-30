import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/BookMark.css";
 

function Bookmark({ selectedTag }) {

const userID = localStorage.getItem('userID');
//   const [bookmarks, setBookmarks] = useState([
//     { BookmarkID: "E000001", Name: "행사 1", Region: "지역 1", isStarred: false },
//     { BookmarkID: "E000002", Name: "행사 2", Region: "지역 2", isStarred: false },
//     { BookmarkID: "H000001", Name: "숙소 1", Region: "지역 3", isStarred: false },
//     { BookmarkID: "H000002", Name: "숙소 2", Region: "지역 4", isStarred: false },
//   ]);
const [bookmarks, setBookmarks] = useState([]);

  const bookmarkFiltering = bookmarks.filter((bookmark) => {
    if (selectedTag === "전체") return true; // 모든 태그 표시
    if (selectedTag === "행사") return bookmark.TypeID.startsWith("E");
    if (selectedTag === "숙소") return bookmark.TypeID.startsWith("H");
    return false;
  });

//   const clickStar = (bookmarkId) => {
//     setBookmarks((prevBookmarks) =>
//       prevBookmarks.map((bookmark) =>
//         bookmark.BookmarkID === bookmarkId
//           ? { ...bookmark, isStarred: !bookmark.isStarred }
//           : bookmark
//       )
//     );
//   };

useEffect(() => {
    // 북마크 데이터를 서버에서 가져오기
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    console.log('fetch함수', userID);
    try {
      const response = await fetch('http://localhost:3001/api/bookmarks',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID }), // 아이디를 본문에 담아서 전송
      }); // 서버에서 북마크 데이터 가져오기
      const data = await response.json();
      setBookmarks(data); // 데이터 상태 업데이트
    } catch (error) {
      console.error("북마크 데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  const clickStar = async (bookmarkId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bookmarks/${bookmarkId}`, {
        method: 'DELETE', // DELETE 요청을 보냄
      });

      if (response.ok) {
        fetchBookmarks(); // 삭제 후 다시 북마크 데이터 불러오기
      } else {
        console.error("북마크 삭제 실패");
      }
    } catch (error) {
      console.error("북마크 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="bookmark-list">
      {bookmarkFiltering.map((bookmark) => (
        <div key={bookmark.BookmarkID} className="bookmark-item">
          {/* <button
            className={`star-button ${
              bookmark.isStarred ? "starred" : ""
            }`}
            onClick={() => clickStar(bookmark.BookmarkID)}
          >
            ★
          </button> */}
          <button
            className="star-button"
            onClick={() => clickStar(bookmark.BookmarkID)}
          >
            ★
          </button>
          <div className="bookmark-text">
          <p className="bookmark-title">{bookmark.Name}</p>
          <p className="bookmark-region">{bookmark.Region}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookmark;