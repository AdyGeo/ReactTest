async function sendData(url = '', method = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(!response.ok){
        throw new Error();
    }
    return response.json(); // parses JSON response into native JavaScript objects
  }

export default sendData;