const HTTP_REQUEST = {
  POST(data){
    return {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    }
  },
  DELETE(){
    return {
      method : 'DELETE',
    }
  },
  PUT(data){
    return {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    }
  }
}

export {HTTP_REQUEST};