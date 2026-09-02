import { CheckIcon, XIcon } from "./icons.jsx";
import { comparisonMatrix, featureCatalog, formatCOP } from "../data/content.js";
import { usePlans } from "../hooks/usePlans.js";

export default function ComparisonTable() {
  const plans = usePlans();
  return (
    <section id="comparar">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Compara</span>
          <h2>¿Qué incluye cada paquete?</h2>
          <p>Todos los detalles para que tomes la mejor decisión para los XV años de tu hija.</p>
        </div>

        <div className="cmp-wrap reveal">
          <table className="cmp-table">
            <thead>
              <tr>
                <th className="cmp-th-feature">Funcionalidad</th>
                {plans.map((plan) => (
                  <th key={plan.id} className={plan.featured ? "cmp-th-featured" : ""}>
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCatalog.map((feature) => (
                <tr key={feature}>
                  <td className="cmp-td-feature">{feature}</td>
                  {plans.map((plan) => {
                    const included = comparisonMatrix[feature]?.includes(plan.id);
                    return (
                      <td key={plan.id}>
                        <span className={`cmp-mark${included ? " yes" : " no"}`} aria-label={included ? "Incluido" : "No incluido"}>
                          {included ? <CheckIcon /> : <XIcon />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="cmp-row-total">
                <td>Precio especial hoy</td>
                {plans.map((plan) => (
                  <td key={plan.id}>{formatCOP(plan.price)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="cmp-hint">← Desliza para ver todos los paquetes →</p>
      </div>
    </section>
  );
}
