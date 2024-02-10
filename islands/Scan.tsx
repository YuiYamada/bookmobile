import { StateUpdater, useEffect, useState } from "preact/hooks";
import Quagga from "quagga";

type Props = {
  ISBNcode: string;
  setIsScan: StateUpdater<boolean>;
  setISBNcode: StateUpdater<string>;
};
const Scan = (props: Props) => {
  const { setIsScan, ISBNcode, setISBNcode } = props;
  let readSameCodeCount = 0;
  let scanedCode = "";
  const [back, setBack] = useState(false);

  useEffect(() => {
    Quagga.onDetected((result) => {
      if (!result) {
        return;
      }
      console.log(scanedCode);
      console.log(result.codeResult.code);
      console.log(readSameCodeCount);

      if (scanedCode == result.codeResult.code) {
        readSameCodeCount++;
      }
      scanedCode = result.codeResult.code;

      if (scanedCode.startsWith("978") && readSameCodeCount > 6) {
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

    Quagga.init(config, function (err) {
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
