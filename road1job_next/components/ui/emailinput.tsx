
type EmailInputProps = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
};

export default function EmailInput({
  value,
  onChange,
  placeholder = "mail@site.com",
  name = "email",
}: EmailInputProps) {
    return (
        <div>
        <label className="input validator bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
          type="email"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="bg-white focus:outline-none "
          required />

        </label>
        <div className="validator-hint hidden">Entrer une adresse email valide</div>
        </div>
    )
}