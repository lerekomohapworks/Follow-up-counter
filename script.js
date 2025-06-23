body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: system-ui, sans-serif;
  background-color: #f9f9f9;
}

#tapBox {
  width: 90vw;
  height: 85vh;
  border: 4px dashed #555;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

#tapText {
  font-size: 1.4rem;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
}

#counterContainer {
  border: 2px solid #888;
  border-radius: 8px;
  padding: 10px 20px;
  background-color: #eee;
}

#tapCount {
  font-size: 3rem;
  text-align: center;
  border: none;
  background: none;
  outline: none;
  width: 100%;
  min-width: 120px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  #tapText {
    font-size: 1.1rem;
  }

  #tapCount {
    font-size: 2.5rem;
  }
}
