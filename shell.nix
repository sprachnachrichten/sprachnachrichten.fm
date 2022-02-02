let pkgs = import <nixpkgs> {};
in pkgs.mkShell {
  nativeBuildInputs = with pkgs; [ 
    nodejs-16_x
    yarn
  ];
}
