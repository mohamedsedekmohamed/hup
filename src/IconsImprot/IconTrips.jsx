import React from 'react'

const IconTrips = ({ active }) => {
    const iconColor = active ? "#1E1E2F" : "#fff"; 
  
  return (
    <div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill={iconColor}  xmlns="http://www.w3.org/2000/svg">
<path d="M14.844 20H6.5C5.121 20 4 18.879 4 17.5C4 16.121 5.121 15 6.5 15H13.5C15.43 15 17 13.43 17 11.5C17 9.57 15.43 8 13.5 8H8.639C8.27175 8.71988 7.81697 9.39164 7.285 10H13.5C14.327 10 15 10.673 15 11.5C15 12.327 14.327 13 13.5 13H6.5C4.019 13 2 15.019 2 17.5C2 19.981 4.019 22 6.5 22H16.093C15.6023 21.3828 15.1833 20.7118 14.844 20ZM5 2C3.346 2 2 3.346 2 5C2 8.188 5 10 5 10C5 10 8 8.187 8 5C8 3.346 6.654 2 5 2ZM5 6.5C4.80295 6.49993 4.60785 6.46106 4.42582 6.38559C4.2438 6.31012 4.07842 6.19954 3.93913 6.06016C3.79984 5.92078 3.68937 5.75533 3.61403 5.57325C3.53868 5.39118 3.49993 5.19605 3.5 4.999C3.50007 4.80195 3.53894 4.60685 3.61441 4.42482C3.68988 4.2428 3.80046 4.07742 3.93984 3.93813C4.07922 3.79884 4.24467 3.68837 4.42675 3.61303C4.60882 3.53768 4.80395 3.49893 5.001 3.499C5.39896 3.49913 5.78056 3.65735 6.06187 3.93884C6.34317 4.22033 6.50113 4.60204 6.501 5C6.50087 5.39796 6.34265 5.77956 6.06116 6.06087C5.77967 6.34217 5.39796 6.50013 5 6.5Z"   fill={iconColor} 
          stroke={iconColor} />
<path  d="M19 14C17.346 14 16 15.346 16 17C16 20.188 19 22 19 22C19 22 22 20.187 22 17C22 15.346 20.654 14 19 14ZM19 18.5C18.803 18.4999 18.6078 18.4611 18.4258 18.3856C18.2438 18.3101 18.0784 18.1995 17.9391 18.0602C17.7998 17.9208 17.6894 17.7553 17.614 17.5733C17.5387 17.3912 17.4999 17.196 17.5 16.999C17.5001 16.802 17.5389 16.6068 17.6144 16.4248C17.6899 16.2428 17.8005 16.0774 17.9398 15.9381C18.0792 15.7988 18.2447 15.6884 18.4267 15.613C18.6088 15.5377 18.804 15.4989 19.001 15.499C19.399 15.4991 19.7806 15.6573 20.0619 15.9388C20.3432 16.2203 20.5011 16.602 20.501 17C20.5009 17.398 20.3427 17.7796 20.0612 18.0609C19.7797 18.3422 19.398 18.5001 19 18.5Z"   fill={iconColor} 
          stroke={iconColor} />
</svg>

    </div>
  )
}

export default IconTrips
