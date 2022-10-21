export default function InfoLine({ info, label }) {
  return (
    <div className="info-line">
      <div className="info-label">{label}:</div>
      <div className="info-content">{info ? info : 'N/A'}</div>
    </div>
  )
}