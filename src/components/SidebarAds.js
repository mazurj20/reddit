import React from "react";
import "../styles/SidebarAds.css";

const SidebarAds1 = ({ top, numOfAds }) => {
  return (
    <div>
      {numOfAds < 2 ? (
        <div className="SidebarAds" style={{ top: top }}>
          <div className="SidebarAds_item">
            <h4>advertisement</h4>
          </div>
          <div className="SidebarAds_item">
            <h4>advertisement</h4>
          </div>
        </div>
      ) : (
        <div className="SidebarAds" style={{ top: top }}>
          {[...Array(numOfAds)].map(() => (
            <div className="SidebarAds_item">
              <h4>advertisement</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SidebarAds1;
