import { useContext, useCallback } from "react";
import Button from "./Button";
import AppContext from "./AppContext";

const Shop = (props) => {
  const {
    state: { shop },
    buy
  } = useContext(AppContext);
  const handleClick = useCallback(
    (e) => {
      const itemId = e.target.getAttribute("data-item-id");
      buy(itemId);
    },
    [buy]
  );

  return (
    <table>
      <thead>
        <tr>
          <th className="border-2">Name</th>
          <th className="border-2">Price</th>
          <th className="border-2">Cpc</th>
          <th className="border-2">Cps</th>
          <th className="border-2">Owned</th>
          <th className="border-2">BUY</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(shop).map(
          ([itemId, { label, price, cpc, cps, owned }]) => (
            <tr key={itemId}>
              <td className="border-2">{label}</td>
              <td className="border-2">{price}</td>
              <td className="border-2">{cpc}</td>
              <td className="border-2">{cps}</td>
              <td className="border-2">{owned}</td>
              <td className="border-2">
                <Button onClick={handleClick} get-item-id={itemId}>
                  BUY
                </Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Shop;
