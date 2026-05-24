
type Props = {
  placeholder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
};


export default function NameInput(props: Props) {
    return(
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              name={props.name}
              required
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength={3}
              maxLength={30}
              title="Quelque chose entre 3 et 30 caractères, commençant par une lettre et ne contenant que des lettres, des chiffres ou des tirets"
              className="bg-white focus:outline-none "
            />
          </label>
          <p className="validator-hint hidden">
            Quelque chose entre 3 et 30 caractères, commençant par une lettre et ne
            <br /> contenant que des lettres, des chiffres ou des tirets
          </p>
          </div>
    )
}