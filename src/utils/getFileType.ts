export default function getFileType(file: File) {

    if(file.type.match('image.*'))
      return 'image';
  
    if(file.type.match('video.*'))
      return 'video';
  
    if(file.type.match('audio.*'))
      return 'audio';
  
    // etc...
  
    return 'other';
  }