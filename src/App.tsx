import { useState, type FormEvent } from "react";
import { calculateAverage } from "./utils/calculate-average";
import { calculateMedian } from "./utils/calculate-median";
import { calculateStandardDeviation } from "./utils/calculate-standard-deviation";
import { calculateVariance } from "./utils/calculate-variance";
import { clx } from "./utils/clx";

function App() {
  const [average, setAverage] = useState<number>();
  const [median, setMedian] = useState<number>();
  const [variance, setVariance] = useState<number>();
  const [standardDeviation, setStandardDeviation] = useState<number>();

  const [errors, setErrors] = useState({
    inputRangeEmpty: false,
    invalidRange: false,
    inputNumberEmpty: false,
  });

  const [numbers, setNumbers] = useState<number[]>([]);
  const [numbersOffLimit] = useState<number[]>([]);

  const [formValue, setFormValue] = useState("");
  const [lowerLimit, setLowerLimit] = useState("");
  const [upperLimit, setUpperLimit] = useState("");
  const [allowRange, setAllowRange] = useState<boolean>(true);

  const handleChangeLowerLimit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setLowerLimit(value);
  };

  const handleChangeUpperLimit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setUpperLimit(value);
  };

  const handleChangeNumbers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValue(value);
  };

  const handleAddNumber = () => {
    if (formValue == "") {
      setErrors((prev) => ({ ...prev, inputNumberEmpty: true }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, inputNumberEmpty: false }));
    }
    if (allowRange) return;

    const value = Number(formValue);
    const lower = Number(lowerLimit);
    const upper = Number(upperLimit);
    if (isNaN(lower)) return;
    if (isNaN(upper)) return;
    if (isNaN(value)) return;

    setNumbers((prevData) => [...prevData, value]);
    if (value < lower || value > upper) {
      numbersOffLimit.push(value);
    }
    setFormValue("");
  };

  const handleSubmitRange = (event: FormEvent) => {
    event.preventDefault();
    if (lowerLimit.trim() == "" || upperLimit.trim() == "") {
      setErrors((prev) => ({ ...prev, inputRangeEmpty: true }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, inputRangeEmpty: false }));
    }
    const lower = Number(lowerLimit);
    const upper = Number(upperLimit);
    if (isNaN(lower)) return;
    if (isNaN(upper)) return;
    if (lower >= upper) {
      setErrors((prev) => ({ ...prev, invalidRange: true }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, invalidRange: false }));
    }
    setNumbers((prevData) => [...prevData, lower, upper]);
    setAllowRange(false);
  };

  const handleSubmitGeneralForm = (event: FormEvent) => {
    event.preventDefault();
    setAverage(calculateAverage(numbers));
    setMedian(calculateMedian(numbers));
    setStandardDeviation(calculateStandardDeviation(numbers));
    setVariance(calculateVariance(numbers));
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl text-center">App de Análisis de Valores</h1>
      <div className="flex w-full justify-center gap-2">
        <section className="grow max-w-2/5 border-2 border-gray-300 rounded-md shadow-2xl">
          <form
            className="p-5 flex flex-col gap-2"
            action="/"
            onSubmit={handleSubmitRange}
          >
            <div className="flex flex-col">
              <label htmlFor="lowerLimit">Límite Inferior</label>
              <input
                className={clx(
                  "border-2 p-2 rounded-md",
                  !allowRange
                    ? "border-gray-300 text-gray-300"
                    : "border-gray-400"
                )}
                type="number"
                name="lowerLimit"
                id="lowerLimit"
                onChange={handleChangeLowerLimit}
                disabled={!allowRange}
              />
              {errors.invalidRange && (
                <p className="text-red-500">
                  El límite inferior debe ser menor que el límite superior
                </p>
              )}
              {errors.inputRangeEmpty && (
                <p className="text-red-500">Debe ingresar un número</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="upperLimit">Límite Superior</label>
              <input
                className={clx(
                  "border-2 p-2 rounded-md",
                  !allowRange
                    ? "border-gray-300 text-gray-300"
                    : "border-gray-400"
                )}
                type="number"
                name="upperLimit"
                id="upperLimit"
                onChange={handleChangeUpperLimit}
                disabled={!allowRange}
              />
              {errors.invalidRange && (
                <p className="text-red-500">
                  El límite superior debe ser mayor que el límite inferior
                </p>
              )}
              {errors.inputRangeEmpty && (
                <p className="text-red-500">Debe ingresar un número</p>
              )}
            </div>
            <button
              className={clx(
                "rounded-lg py-2 px-5  transition-all",
                !allowRange ? "bg-amber-100" : "bg-amber-200 hover:bg-amber-100"
              )}
              type="submit"
              disabled={!allowRange}
            >
              Confirmar
            </button>
          </form>
          <div className="p-5 flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <label htmlFor="number">Ingrese un número</label>
              <div className="flex flex-wrap gap-2">
                <input
                  className={clx(
                    "border-2 p-2 rounded-md max-w-full",
                    allowRange
                      ? "border-gray-300 text-gray-300"
                      : "border-gray-400"
                  )}
                  type="number"
                  name="number"
                  id="number"
                  onChange={handleChangeNumbers}
                  value={formValue}
                  disabled={allowRange}
                />
                <button
                  className={clx(
                    "rounded-lg py-2 px-5  transition-all",
                    allowRange
                      ? "bg-amber-100"
                      : "bg-amber-200 hover:bg-amber-100"
                  )}
                  onClick={handleAddNumber}
                  disabled={allowRange}
                >
                  Agregar
                </button>
              </div>
              {errors.inputNumberEmpty && (
                <p className="text-red-500">Debe ingresar un número</p>
              )}
              <div className="flex flex-wrap w-full">
                {numbers.map((number, i) => (
                  <span
                    key={i}
                    className="py-2 px-3 border-2 border-gray-200 rounded-md"
                  >
                    {number}
                  </span>
                ))}
              </div>
              <button
                className={clx(
                  "rounded-lg py-2 px-5  transition-all",
                  allowRange
                    ? "bg-amber-100"
                    : "bg-amber-200 hover:bg-amber-100"
                )}
                onClick={handleSubmitGeneralForm}
              >
                Calcular
              </button>
            </div>
          </div>
        </section>
        <section className="grow h-fit max-w-2/5 rounded-md shadow-2xl gap-2">
          <div className="flex w-full flex-wrap">
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-md shadow-2xs grow">
              <h2 className="text-lg font-bold text-center">Límite Inferior</h2>
              <h3 className="text-center">{lowerLimit}</h3>
            </div>
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-md shadow-2xs grow">
              <h2 className="text-lg font-bold text-center">Límite Superior</h2>
              <h3 className="text-center">{upperLimit}</h3>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between p-4 border-2 border-gray-200 rounded-md shadow-2xs grow">
              <p>Promedio(media):</p>
              <p className="font-bold">{average}</p>
            </div>
            <div className="flex justify-between p-4 border-2 border-gray-200 rounded-md shadow-2xs grow">
              <p>Mediana:</p>
              <p className="font-bold">{median}</p>
            </div>
            <div className="flex justify-between p-4 border-2 border-gray-200 rounded-md shadow-2xs grow">
              <p>Desviación estándar:</p>
              <p className="font-bold">{standardDeviation}</p>
            </div>
            <div className="flex justify-between p-4 border-2 border-gray-200 rounded-md shadow-2xs grow">
              <p>Varianza:</p>
              <p className="font-bold">{variance}</p>
            </div>
            <div className="flex flex-col p-4 border-2 border-gray-200 rounded-md shadow-2xs grow">
              <p>Valores fuera de especificación:</p>
              <div className="flex flex-wrap w-full grow">
                {numbersOffLimit.map((number, i) => (
                  <span
                    key={i}
                    className="py-2 px-3 border-2 border-gray-200 rounded-md"
                  >
                    {number}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
