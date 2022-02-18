//any currency to any currency, return list {value,rest}
export function ChangeCurrency(currency1, currency2, value) {

  let amount = { Value: 0, Rest: 0 };

  if (currency1 === currency2) {
    amount.Value = value
    return amount
  }
  switch (currency1) {

    case "Copper": //copper to any other currency
      switch (currency2) {
        case "Silver":
          amount.Value = Math.trunc(value / 10)
          amount.Rest = value % 10
          break;
        case "Electrum":
          amount.Value = Math.trunc(value / 50)
          amount.Rest = value % 50
          break;
        case "Gold":
          amount.Value = Math.trunc(value / 100)
          amount.Rest = value % 100
          break;
        case "Platinum":
          amount.Value = Math.trunc(value / 1000)
          amount.Rest = value % 1000
          break;
      }
      break;

    case "Silver": //silver to any other currency
      switch (currency2) {
        case "Copper":
          amount.Value = value * 10
          break;
        case "Electrum":
          amount.Value = Math.trunc(value / 5)
          amount.Rest = value % 5
          break;
        case "Gold":
          amount.Value = Math.trunc(value / 10)
          amount.Rest = value % 10
          break;
        case "Platinum":
          amount.Value = Math.trunc(value / 100)
          amount.Rest = value % 100
          break;
      }
      break;

    case "Electrum": //electrum to any other currency
      switch (currency2) {
        case "Copper":
          amount.Value = value * 50
          break;
        case "Silver":
          amount.Value = value * 5
          break;
        case "Gold":
          amount.Value = Math.trunc(value / 2)
          amount.Rest = value % 2
          break;
        case "Platinum":
          amount.Value = Math.trunc(value / 20)
          amount.Rest = value % 20
          break;
      }
      break;

    case "Gold": //gold to any other currency
      switch (currency2) {
        case "Copper":
          amount.Value = value * 100
          break;
        case "Silver":
          amount.Value = value * 10
          break;
        case "Electrum":
          amount.Value = value * 2
          break;
        case "Platinum":
          amount.Value = Math.trunc(value / 10)
          amount.Rest = value % 10
          break;
      }
      break;

    case "Platinum": //platinum to any other currency
      switch (currency2) {
        case "Copper":
          amount.Value = value * 1000
          break;
        case "Silver":
          amount.Value = value * 100
          break;
        case "Electrum":
          amount.Value = value * 20
          break;
        case "Gold":
          amount.Value = value * 10
          break;
      }
      break;
  }

  return amount;
}

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);