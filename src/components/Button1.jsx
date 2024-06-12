    /* eslint-disable react/prop-types */
function Button1({title,className,icon}) {
  return (
    <button
        className={`${className} bg-blue-500 text-white font-bold px-6 py-2 rounded-full`}
      >
        <span>{icon}</span> <span> {title}</span>
      </button>
  )
}

export default Button1
