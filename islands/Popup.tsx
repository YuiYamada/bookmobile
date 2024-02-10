import { StateUpdater } from "preact/hooks/src/index.js";
import { JSXInternal } from "preact/src/jsx.d.ts";
import IconX from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/x.tsx";
import IconPhoto from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/photo.tsx";
import { Item } from "../type.ts";

type Props = {
  viewFlag: boolean;
  setViewFlag: StateUpdater<boolean>;
  item: Item | undefined;
};
export const Popup = (props: Props) => {
  const { viewFlag, setViewFlag, item } = props;
  // 枠外クリック用関数
  const closePopup = () => {
    setViewFlag(false);
  };
  // 枠内クリック
  const preventClose = (
    e: JSXInternal.TargetedMouseEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
  };
  return (
    <>
      <div
        className={"fixed flex flex-col items-center justify-center overflow-hidden bg-gray-500/50" +
          (viewFlag
            ? " top-0 left-0 h-screen w-screen "
            : " top-1/2 left-1/2 h-0 w-0 ")}
        onClick={closePopup}
      >
        <div className="relative h-1/2 w-11/12 max-w-3xl">
          <div
            onClick={preventClose}
            className="flex h-full w-full flex-col bg-white rounded-lg"
          >
            <button onClick={closePopup} class="m-2 w-8 h-8">
              <IconX class="w-8 h-8" />
            </button>
            <div class="flex">
              <div class="ml-4 mt-4 w-1/2">
                {item?.volumeInfo?.imageLinks?.thumbnail
                  ? (
                    <img
                      class="object-contain w-full h-full"
                      src={item.volumeInfo.imageLinks.thumbnail}
                    />
                  )
                  : (
                    <div>
                      <IconPhoto class="w-full h-full" />
                      <p class="ml-6 text-2xl font-bold text-gray-900">
                        No Image
                      </p>
                    </div>
                  )}
              </div>
              <div class="w-1/2">
                <p class="h-1/4 ml-2 mr-4 text-xl font-bold text-gray-900">
                  {item && item.volumeInfo.title.substring(0, 15)}
                </p>
                <p class="ml-2 mr-4 text-sm font-light text-gray-900">
                  {item?.volumeInfo?.description &&
                    `${item.volumeInfo.description.substring(0, 100)}・・・`}
                </p>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <button
                onClick={() => {
                  console.log("reggisterd");
                }}
                class="flex justify-center items-center bg-white rounded-full w-2/3 h-16 mt-6 border-2 border-gray-300
							text-xl font-bold text-gray-900"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
