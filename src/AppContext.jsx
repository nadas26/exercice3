import deepmerge from "deepmerge";
import { createContext, useCallback, useEffect, useState } from "react";

const initialState = {
  coins: 50,
  shop: {
    SmallRobot: {
      label: "Small Robot",
      price: 10,
      cpc: 1,
      cps: 0,
      owned: 0
    },
    MediumRobot: {
      label: "Medium Robot",
      price: 15,
      cpc: 2,
      cps: 1,
      owned: 0
    },
    LargeRobot: {
      label: "Large Robot",
      price: 25,
      cpc: 6,
      cps: 4,
      owned: 0
    }
  }
};

const AppContext = createContext(initialState);

export const AppContextProvider = (props) => {
  //setstate ne changera pas de def de fonction en memoir
  const [state, setState] = useState(initialState);
  const work = useCallback(() => {
    setState((currentState) =>
      //console.log(currentState.shop);
      deepmerge(currentState, {
        coins:
          currentState.coins +
          1 +
          Object.values(currentState.shop).reduce(
            (totCpc, { owned, cpc }) => totCpc + owned * cpc,
            0
          )
      })
    );
  }, []);

  const buy = useCallback((itemId) => {
    setState((currentState) => {
      console.log(itemId, currentState.shop);

      const { price, owned } = currentState.shop[itemId];
      if (currentState.coins < price) {
        return currentState;
      }

      return deepmerge(currentState, {
        coins: currentState.coins - price,
        shop: {
          [itemId]: {
            price,
            owned: owned + 1
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    let timerId = null;
    const updateState = () => {
      setState((currentState) =>
        deepmerge(currentState, {
          coins:
            currentState.coins +
            Object.values(currentState.shop).reduce(
              (totCps, { owned, cps }) => totCps + owned * cps,
              0
            )
        })
      );

      timerId = setTimeout(updateState, 1000);
    };
    updateState();

    return () => clearInterval(timerId);
  }, []);

  return <AppContext.Provider {...props} value={{ state, buy, work }} />;
};
export default AppContext;
