const LanguageSelector = ({ currentLang, setLang }) => {
  return (
    <select
      value={currentLang}
      onChange={(e) => setLang(e.target.value)}
      className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600"
    >
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="c">C</option>
      <option value="dsa">DSA (Java)</option>
    </select>
  )
}

export default LanguageSelector
