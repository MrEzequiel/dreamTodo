


export async function createCode(){

  const chars = '0123456789'.split('');
  let result = '';

  for(var i = 0; i < 6; i++) {
    var x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }

  const code = result;

  return code; 
}
