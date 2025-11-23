export default function PageHeader({ text, subtext }) {
  return (
    <div className="py-4 border-bottom mb-4">
      <h1 className="mb-1">{text}</h1>
      {subtext ? <p className="text-muted m-0">{subtext}</p> : null}
    </div>
  );
}
