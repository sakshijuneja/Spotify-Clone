import React, { useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchModal() {
    
  let subtitle;
  const [modalIsOpen, setIsOpened] = React.useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // CSS for modal content
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#292929",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  };

      function openMyModal() {
        setIsOpened(true);
      }
    
      function afterOpenModal() {
        subtitle.style.color = "white";
      }
    
      function closeModal() {
        setIsOpened(false);
      }
    
      const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= 20) {
          setInputValue(value);
          setShowMessage(false);
        } else {
          setInputValue(value.slice(0, 20));
          setShowMessage(true);
        }
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        setInputValue(""); // Clear input value after form submission
        closeModal(); // Close modal after form submission
      };

  return (
    <div>
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Songs Modal"
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        
            <button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={closeModal}
            >
              <CloseIcon sx={{ color: "red", cursor: "pointer" }} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search for Songs"
              style={{ fontSize: "1rem", width: "100%", paddingLeft: "0.5rem" }}
            />{" "}
            {showMessage && (
              <div style={{ color: "red" }}>
                Input must not exceed 20 characters
              </div>
            )}
            <button
              className="log-in-btn"
              style={{ width: "50%", padding: "0.5rem 0rem", color: "white" }}
            >
              Search Songs
            </button>
          </form>
          {/* Render list of songs */}
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            
              return (
                <>
                hi
                </>
              );
           </div>
        </Modal>
    </div>
  )
}
