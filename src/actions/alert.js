export default function alert(payload) {
  return {
    type: 'ALERT',
    payload,
  }
}
