import DeathScreen from "@/components/deathscreens/DeathScreen";

export const deathScreensMap: Record<
  string,
  (props: { onRetry: () => void }) => JSX.Element
> = {
  explosionDeathScreen: ({ onRetry }) => (
    <DeathScreen
      title="TWÓJ STATEK EKSPLODOWAŁ"
      //   description="Twój statek został zniszczony..."
      image={require("@/assets/images/deathscreens/ship_explode.png")}
      onRetry={onRetry}
    />
  ),

  spadlesZUrwiska: ({ onRetry }) => (
    <DeathScreen
      title="SPADASZ Z URWISKA"
      //   description="Utworzyła się dziura w kadłubie. Nikt nie przeżył."
      image={require("@/assets/images/spadles_z_urwiska.png")}
      onRetry={onRetry}
    />
  ),

  spadlesWOtchlan: ({ onRetry }) => (
    <DeathScreen
      title="SPADASZ W OTCHŁAŃ"
      //   description="Utworzyła się dziura w kadłubie. Nikt nie przeżył."
      image={require("@/assets/images/spadles_z_urwiska.png")}
      onRetry={onRetry}
    />
  ),

  // Tu dodasz kolejne typy śmierci np.
  spaceDeathScreen: ({ onRetry }) => (
    <DeathScreen
      title="WYSSANY W PRÓŻNIĘ"
      //   description="Utworzyła się dziura w kadłubie. Nikt nie przeżył."
      image={require("@/assets/images/bg_intro.png")}
      onRetry={onRetry}
    />
  ),

  // Tu dodasz kolejne typy śmierci np.
  stormDeathScreen: ({ onRetry }) => (
    <DeathScreen
      title="GINIESZ W BURZY"
      //   description="Utworzyła się dziura w kadłubie. Nikt nie przeżył."
      image={require("@/assets/images/spadles_z_urwiska.png")}
      onRetry={onRetry}
    />
  ),
};
