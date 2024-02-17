import { StateUpdater, useEffect } from "preact/hooks";
import Quagga from "quagga";

type Props = {
  setIsScan: StateUpdater<boolean>;
  setISBNcode: StateUpdater<string>;
};
const Scan = (props: Props) => {
  const { setIsScan, setISBNcode } = props;
  let readSameCodeCount = 0;
  let scanedCode = "";

  useEffect(() => {
    Quagga.onDetected((result: any) => {
      if (!result) {
        return;
      }
      console.log(scanedCode);

      if (scanedCode == result.codeResult.code) {
        readSameCodeCount++;
      }
      scanedCode = result.codeResult.code;

      if (scanedCode.startsWith("978") && readSameCodeCount > 3) {
        setISBNcode(scanedCode);
        setIsScan(false);
        Quagga.stop();
      }
    });
    const config = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: "#preview",
        size: 800,
        singleChannel: false,
      },
      locator: {
        patchSize: "medium",
        halfSample: true,
      },
      decoder: {
        readers: [{
          format: "ean_reader",
          config: {},
        }],
      },
      numOfWorker: navigator.hardwareConcurrency || 4,
      locate: true,
      src: null,
    };

    Quagga.init(config, function (err: any) {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    });
  }, []);

  return <div class="m-8" id="preview"></div>;
};

export default Scan;
